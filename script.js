const weapons = [
  { name: 'Short Sword', rarity: 'common' },
  { name: 'Long Sword', rarity: 'uncommon' },
  { name: 'Great Sword', rarity: 'rare' },
  { name: 'Dagger', rarity: 'common' },
  { name: 'Bow', rarity: 'uncommon' },
  { name: 'Crossbow', rarity: 'rare' }
];

const armors = [
  { name: 'Leather Armor', rarity: 'common' },
  { name: 'Chainmail Armor', rarity: 'uncommon' },
  { name: 'Plate Armor', rarity: 'rare' },
  { name: 'Cloth Robes', rarity: 'common' },
  { name: 'Studded Leather Armor', rarity: 'uncommon' },
  { name: 'Scale Armor', rarity: 'rare' }
];

function getRandomItems(list, rarity, numItems) {
  const filteredList = list.filter(item => item.rarity === rarity);
  const availableItems = [];
  for (let i = 0; i < numItems; i++) {
    const randomIndex = Math.floor(Math.random() * filteredList.length);
    const item = filteredList[randomIndex];
    availableItems.push(item);
  }
  return availableItems;
}

function generateItems() {
  const itemList = document.getElementById('item-list');
  itemList.innerHTML = '';
  
  const shopType = document.getElementById('shop-type').value;
  const commonChance = (shopType === 'well-stocked') ? 0.9 : ((shopType === 'normal') ? 0.7 : 0.5);
  
  const weaponsList = getRandomItems(weapons, 'common', Math.floor(Math.random() * 6) + 5)
                     .concat(getRandomItems(weapons, 'uncommon', Math.floor(Math.random() * 3) + 1))
                     .concat(getRandomItems(weapons, 'rare', Math.floor(Math.random() * 2)));
                     
  const armorsList = getRandomItems(armors, 'common', Math.floor(Math.random() * 3) + 2)
                    .concat(getRandomItems(armors, 'uncommon', Math.floor(Math.random() * 2)))
                    .concat(getRandomItems(armors, 'rare', Math.floor(Math.random() * 1)));
  
  const availableItems = weaponsList.concat(armorsList);
  
  for (let item of availableItems) {
    const rarityChance = (item.rarity === 'common') ? commonChance : ((item.rarity === 'uncommon') ? 0.3 : 0.1);
    const randomChance = Math.random();
    if (randomChance <= rarityChance) {
      const itemElement = document.createElement('li');
      itemElement.textContent = item.name;
      itemList.appendChild(itemElement);
    }
  }
}
