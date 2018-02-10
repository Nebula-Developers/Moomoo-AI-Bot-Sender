/*

####      If you're here and you're      ####
####    not a developer of these bots,   ####
####      you're in the wrong place.     ####

*/

let hatPrices = [];
let hatInfo = undefined; // paste the hat array object here

hatInfo.forEach(function(currentItem){
    hatPrices[currentItem.id] = currentItem.price;
});

const output = JSON.stringify(hatPrices, undefined, 4);
require("fs").writeFileSync("hats.json", output, "utf8");
