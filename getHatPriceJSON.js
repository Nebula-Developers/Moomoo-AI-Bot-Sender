let hatPrices = [];
let hatInfo = undefined; // paste the hat array object here

hatInfo.forEach(function(currentItem){
    hatPrices[currentItem.id] = currentItem.price;
});

const fs = require("fs");
const output = JSON.stringify(hatPrices, undefined, 4);

fs.writeFile("hats.json", output, "utf8");
