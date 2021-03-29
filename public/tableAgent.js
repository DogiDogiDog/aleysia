"use strict"
const sql=require("../lib/sqlfunction")

function createTable(){
    listAgents = sql.getListAgents()
    console.log(listAgents)
    var body = document.getElementsByTagName("agents")[0];
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    for (var i = 0; i < 2; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 2; j++) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode("cell in row "+i+", column "+j);
        cell.appendChild(cellText);
        row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
}

function addAgent(){

}

function deleteAgent(){

}

module.exports={createTable}