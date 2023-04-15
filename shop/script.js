function generateShop() {
  fetch('weapons.tsv?v=' + Math.random())
    .then(response => response.text())
    .then(data => {
      const weapons = parseTsv(data);
      const shop = [];
      const size = document.getElementById("shopSize").value;
      let commonChance = 90;
      let uncommonChance = 50;
      let rareChance = 0;
      let maxItems = 4;

      if (size === "normal") {
        commonChance = 50;
        uncommonChance = 25;
        rareChance = 8;
        maxItems = 17;
      } else if (size === "well-stocked") {
        commonChance = 90;
        uncommonChance = 50;
        rareChance = 17;
        maxItems = 10;
      }

      const availableItems = weapons.filter(item => {
        const rarity = item.RARITY;
        const itemChance = rarity === "Common" ? commonChance : (rarity === "Uncom" ? uncommonChance : rareChance);
        return Math.floor(Math.random() * 100) < itemChance;
      });

      if (availableItems.length === 0) {
        const shopList = document.getElementById("shopList");
        shopList.innerHTML = "Sorry sir, in this remote outpost no weapons are available at the moment.";
      } else {
        while (shop.length < maxItems && availableItems.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableItems.length);
          const weapon = availableItems.splice(randomIndex, 1)[0];
          shop.push(weapon);
        }

        displayShop(shop);
      }
    })
    .catch(error => console.log(error));
}

/* The new function starts by splitting the TSV file into an array of lines using the split() method with the newline character as the delimiter. Then it uses the shift() method to remove the first line from the array and split it into an array of column headers.

Next, it uses the map() method to transform each line of the TSV into an object with properties corresponding to each column header. For each line, it splits the values using the tab character as the delimiter and then uses the reduce() method to create an object with properties corresponding to each column header and values corresponding to the values in that line.

Finally, the map() method returns an array of objects representing each line in the TSV. */

function parseTsv(tsv) {
  const lines = tsv.split('\n');
  const headers = lines.shift().split('\t');
  return lines.map(line => {
    const values = line.split('\t');
    const object = {};
    for (let i = 0; i < headers.length; i++) {
      object[headers[i]] = values[i];
    }
    return object;
  });
}
/*
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
*/

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

  // Create the table header row
  const headerRow = document.createElement("tr");
  const headers = ["PRICE", "GRIP", "WEAPON", "BONUS", "DAMAGE", "RANGE", "WEIGHT", "FEATURE"];
  for (let i = 0; i < headers.length; i++) {
    const headerCell = document.createElement("th");
    headerCell.innerText = headers[i];
    headerCell.style.textTransform = "uppercase";
    headerCell.style.fontSize = "10px";
    headerCell.style.fontVariant = "small-caps";
    headerRow.appendChild(headerCell);
  }
  shopList.appendChild(headerRow);

  // Create a table row for each item in the shop
  for (let i = 0; i < shop.length; i++) {
    const row = document.createElement("tr");

    const costCell = document.createElement("td");
    costCell.innerText = shop[i].PRICE;
    row.appendChild(costCell);

    const gripCell = document.createElement("td");
    gripCell.innerText = shop[i].GRIP;
    row.appendChild(gripCell);

    const nameCell = document.createElement("td");
    nameCell.innerText = shop[i].WEAPON;
    row.appendChild(nameCell);

    const bonusCell = document.createElement("td");
    bonusCell.innerText = shop[i].BONUS;
    row.appendChild(bonusCell);

    const damageCell = document.createElement("td");
    damageCell.innerText = shop[i].DAMAGE;
    row.appendChild(damageCell);

    const rangeCell = document.createElement("td");
    rangeCell.innerText = shop[i].RANGE;
    row.appendChild(rangeCell);

    const weightCell = document.createElement("td");
    if (shop[i].WEIGHT === "Normal") {
      weightCell.innerText = "";
    } else {
      weightCell.innerText = shop[i].WEIGHT;
    }
    row.appendChild(weightCell);

    const featureCell = document.createElement("td");
    const featureColumns = Object.keys(shop[i]).filter(column => column.startsWith("FEATURE"));
    const features = featureColumns.map(column => shop[i][column]).join(", ");
    featureCell.innerText = features;
    row.appendChild(featureCell);

    shopList.appendChild(row);
  }
}
