'use strict'

 module.exports= class Agent{
    constructor(id,prenom, nom, objectif, isResponsable, isDirector){
        this.id=id;
        this.prenom=prenom;
        this.nom=nom;
        this.objectif=objectif
        this.isResponsable=isResponsable;
        this.isDirector=isDirector
    }
}
