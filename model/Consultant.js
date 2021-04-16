

class Consultant{
    constructor(id,first_name, name, company, price,cost,charges, responsable, marginPerCent, margin, business, totalMargin, calendar ){
        this.id=id
        this.first_name=first_name;
        this.name=name;
        this.company=company;
        this.price=price;
        this.cost=cost;
        this.charges=charges;
        this.responsable=responsable;
        this.marginPerCent=marginPerCent;
        this.margin=margin;
        this.business=business;
        this.totalMargin=totalMargin;
        this.calendar=calendar;
    }


getId(){
    return this.id
}

getName(){
    return this.name;

}
getFirstName(){
    return this.first_name;
}

getCalendar(){
    return this.calendar;
}
}
module.exports=Consultant;