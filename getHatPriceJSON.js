let hatPrices = [];
let array = undefined; // paste the hat array object here

array.forEach(function(i){
    hatPrices[i.id] = i.price;
});

copy(JSON.stringify(hatPrices, undefined, 4));
