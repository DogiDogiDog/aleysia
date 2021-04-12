


let price, cost, charges = 0

function marginPerCent(price, cost, charges){
    return (((price-cost-charges)/(price-charges))*100).toFixed(2)
}

function margin(price, cost, charges){
    price = price
    cost = cost 
    charges = charges
    return price-cost-charges
}

function business(price, charges, daysworked){
    return (price - charges) * daysworked
}

function totalMargin(price, cost, charges, daysworked){
    return (price-cost-charges)*daysworked
}

module.exports={marginPerCent, margin, business, totalMargin}