'use strict'

 module.exports= class Agent{

    constructor(id,first_name, name, email,objectif){
        this.id=id;
        this.first_name=first_name;
        this.name=name;
        this.email=email;
        this.objectif=objectif
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




}
