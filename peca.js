const MOVE_OK = 0;
const MOVE_FAIL = -1;
const MOVE_CAP = 1;

function Peca(tipo, posI, posJ, ID, unic) {
    this._i = posI;
    this._j = posJ;
    this._ID = ID;
    this._tipo = tipo;
    this._unic = unic;

    console.log("reg " + tipo);

    this.__movemod = -1;

    this.getI = function() {return this._i;}
    this.setI = function(i) {this._i = i;}
    this.getJ = function() {return this._j;}
    this.setJ = function(j) {this._j = j;}
    this.getID = function() {return this._ID;}
    this.setID = function(id) {this._ID = id;}
    this.getTipo = function() {return this._tipo;}
    this.setTipo = function(tipo) {this._tipo = tipo;}
    this.getUnicode = function() { return this._unic; }
    //this.setUnicode = function(tipo) {this._tipo = tipo;}

    console.log("Created new base Peca");
}

Peca.prototype.mover = function(tabuleiro, i, j) {
    // Não pode mover uma peça para fora do tabuleiro.
    if (i > tabY || i < 0 || j > tabX || j < 0)
        return MOVE_FAIL;

    // Não pode mover uma peça para o thissmo lugar.
    if (this._i == i && this._j == j)
        return MOVE_FAIL;

    return MOVE_OK;
}