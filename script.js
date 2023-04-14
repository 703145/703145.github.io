function generateShop() {
  fetch('weapons.tsv')
    .then(response => response.text())
    .then(data => {
      const weapons = parseTsv(data);
      const shop = [];
      const size = document.getElementById("shopSize").value;
      let commonChance = 90;
      let uncommonChance = 50;
      let rareChance = 10;

      if (size === "normal") {
        commonChance = 50;
        uncommonChance = 30;
        rareChance = 5;
      } else if (size === "well-stocked") {
        commonChance = 20;
        uncommonChance = 10;
        rareChance = 2;
      }

      for (let i = 0; i < 10; i++) {
        const weaponRarity = pickRarity(commonChance, uncommonChance, rareChance);
        const weapon = pickItemByRarity(weapons, weaponRarity);
        shop.push(weapon);
      }

      displayShop(shop);
    })
    .catch(error => console.log(error));
}

function parseTsv(tsv) {
  const lines = tsv.split('\n');
  const headers = lines.shift().split('\t');
  return lines.map(line => {
    const values = line.split('\t');
    return headers.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
  });
}

function pickRarity(commonChance, uncommonChance, rareChance) {
  const rarity = Math.floor(Math.random() * 100);
  if (rarity < commonChance) {
    return "Common";
  } else if (rarity < uncommonChance) {
    return "Uncom";
  } else {
    return "Rare";
  }
}

function pickItemByRarity(items, rarity) {
  const itemsByRarity = items.filter(item => {
    return item.RARITY === rarity;
  });
  const randomIndex = Math.floor(Math.random() * itemsByRarity.length);
  return itemsByRarity[randomIndex];
}

function displayShop(shop) {
  const shopList = document.getElementById("shopList");
  shopList.innerHTML = "";
  for (let i = 0; i < shop.length; i++) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.innerText = shop[i].WEAPON;
    row.appendChild(nameCell);
    const damageCell = document.createElement("td");
    damageCell.innerText = shop[i].DAMAGE;
    row.appendChild(damageCell);
    const costCell = document.createElement("td");
    costCell.innerText = shop[i].PRICE;
    row.appendChild(costCell);
    const featuresCell = document.createElement("td");
    featuresCell.innerText = shop[i].FEATURES;
    row.appendChild(featuresCell);
    shopList.appendChild(row);
  }
}
