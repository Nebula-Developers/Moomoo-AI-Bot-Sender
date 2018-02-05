let hatPrices = [];
let hatInfo = undefined; // paste the hat array object here

hatInfo.forEach(function(currentItem){
    hatPrices[currentItem.id] = currentItem.price;
});

console.log(JSON.stringify(hatPrices, undefined, 4));
