'use strict'

 module.exports= class Agent{

    
    constructor(id,first_name, name, objectif, isResponsable, isDirector){
        this.id=id;
        this.first_name=first_name;
        this.name=name;
        this.objectif=objectif
        this.isResponsable=isResponsable;
        this.isDirector=isDirector
    }

    getId(){
        return this.id;
    }
    getName(){
        return this.name;

    }
    getFirstName(){

    }




}
