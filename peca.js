function Peca(tipo, posI, posJ, ID, unic) {
    this._i = posI;
    this._j = posJ;
    this._ID = ID;
    this._tipo = tipo;
    this._unic = unic;

    this.getI = function() {return this._i;}
    this.setI = function(i) {this._i = i;}
    this.getJ = function() {return this._j;}
    this.setJ = function(j) {this._j = j;}
    this.getID = function() {return this._ID;}
    this.setID = function(id) {this._ID = id;}
    this.getTipo = function() {return this._tipo;}
    this.setTipo = function(tipo) {this._tipo = tipo;}
    this.getUnicode = function() {return this._unic;}
    //this.setUnicode = function(tipo) {this._tipo = tipo;}

    const moveMod = 1;
    const tabX = 7;
    const tabY = 7;

    console.log("Created new base Peca");
}

Peca.prototype.mover = function(tabuleiro, i, j) {
    // Não pode mover uma peça para fora do tabuleiro.
    if (i > tabY || i < 0 || j > tabX || j < 0)
        return false;

    // Não pode mover uma peça para o mesmo lugar.
    if (this.i == i && this.j == j)
        return false;

    return true;
    //return tabuleiro.movePeca(this, i, j);
}