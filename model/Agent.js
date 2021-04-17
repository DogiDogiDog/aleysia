'use strict'

 module.exports= class Agent{

    constructor(id,first_name, name, email,objectif, calendar){
        this.id=id;
        this.first_name=first_name;
        this.name=name;
        this.email=email;
        this.objectif=objectif
        this.calendar=calendar
    }

    getId(){
        return this.id;
    }
    getName(){
        return this.name;

    }
    getFirstName(){
        return this.first_name;
    }

    getObjectif(){
        return this.objectif
    }

    getCalendar(){
        return this.calendar
    }


}
