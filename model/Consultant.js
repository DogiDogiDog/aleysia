

class Consultant{
    constructor(first_name, name, company, price,cost,charges,responsable){
        this.first_name=first_name;
        this.name=name;
        this.company=company;
        this.price=price;
        this.cost=cost;
        this.charges=charges;
        this.responsable=responsable;
}

getName(){
    return this.name;

}
getFirstName(){
    return this.first_name;
}

}
module.exports=Consultant;