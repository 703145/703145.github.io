function generateShop() {
  var weapons = [
    {name: "Short Sword", rarity: "common"},
    {name: "Long Sword", rarity: "uncommon"},
    {name: "Great Sword", rarity: "rare"}
  ];
  
  var armours = [
    {name: "Leather Armour", rarity: "common"},
    {name: "Chainmail Armour", rarity: "uncommon"},
    {name: "Plate Armour", rarity: "rare"}
  ];
  
  var shop = [];
  var size = document.getElementById("shopSize").value;
  var commonChance = 90;
  var uncommonChance = 50;
  var rareChance = 10;
  
  if (size === "normal") {
    commonChance = 50;
    uncommonChance = 30;
    rareChance = 5;
  } else if (size === "well-stocked") {
    commonChance = 20;
    uncommonChance = 10;
    rareChance = 2;
  }
  
  for (var i = 0; i < 10; i++) {
    var weaponRarity = pickRarity(commonChance, uncommonChance, rareChance);
    var armourRarity = pickRarity(commonChance, uncommonChance, rareChance);
    var weapon = pickItemByRarity(weapons, weaponRarity);
    var armour = pickItemByRarity(armours, armourRarity);
    shop.push(weapon);
    shop.push(armour);
  }
  
  displayShop(shop);
}

function pickRarity(commonChance, uncommonChance, rareChance) {
  var rarity = Math.floor(Math.random() * 100);
  if (rarity < commonChance) {
    return "common";
  } else if (rarity < uncommonChance) {
    return "uncommon";
  } else {
    return "rare";
  }
}

function pickItemByRarity(items, rarity) {
  var itemsByRarity = items.filter(function(item) {
    return item.rarity === rarity;
  });
  var randomIndex = Math.floor(Math.random() * itemsByRarity.length);
  return itemsByRarity[randomIndex];
}

function displayShop(shop) {
  var shopList = document.getElementById("shopList");
  shopList.innerHTML = "";
  for (var i = 0; i < shop.length; i++) {
    var listItem = document.createElement("li");
    listItem.innerText = shop[i].name;
    shopList.appendChild(listItem);
  }
}
