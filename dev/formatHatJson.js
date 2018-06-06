let hatPrices = [];
let hatInfo = undefined; // paste the hat array object here

hatInfo.forEach(function(currentItem){
    hatPrices[currentItem.id] = currentItem.price;
});

const output = JSON.stringify(hatPrices, undefined, 4);
require("fs").writeFileSync("hats.json", output, "utf8");
