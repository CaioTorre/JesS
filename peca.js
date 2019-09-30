const MOVE_OK = 0;
const MOVE_FAIL = -1;
const MOVE_CAP = 1;

// Identificador de cada peça!
const W_KING   = 1;  // "&#9812" ♔
const W_QUEEN  = 2;  // "&#9813" ♕
const W_ROOK   = 3;  // "&#9814" ♖
const W_BISHOP = 4;  // "&#9815" ♗
const W_KNIGHT = 5;  // "&#9816" ♘
const W_PAWN   = 6;  // "&#9817" ♙
const B_KING   = 7;  // "&#9818" ♚
const B_QUEEN  = 8;  // "&#9819" ♛
const B_ROOK   = 9;  // "&#9820" ♜
const B_BISHOP = 10; // "&#9821" ♝
const B_KNIGHT = 11; // "&#9822" ♞
const B_PAWN   = 12; // "&#9823" ♟

const P_WHITE  = -1;
const P_BLACK  = 1;
    
function Peca(tipo, posI, posJ, ID, unic) {
    this._i = posI;
    this._j = posJ;
    this._ID = ID;
    this._tipo = tipo;
    this._unic = unic;

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

Peca.prototype.checkCap = function(tabuleiro, i, j) {
    // Checagem captura de peças
    var p_target = tabuleiro.getPeca(i, j);
    if (p_target != undefined) {
        // Só pode capturar peças do tipo oposto
        return (p_target.getTipo() != this.getTipo() ? MOVE_CAP : MOVE_FAIL);
    }

    // Caso contrario, movimento válido
    return MOVE_OK;
}

Peca.prototype.getUnicodeID = function(id) { return ["", "♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"][id]; }

Peca.prototype.autoCreate = function(tipo, i, j, id, unicode) {
    if (unicode == undefined) unicode = Peca.prototype.getUnicodeID.call(null, id);
    if (id <= 0) return undefined;
    return new [
        P_Rei   (tipo, i, j, W_KING,   unicode),
        P_Rainha(tipo, i, j, W_QUEEN,  unicode),
        P_Torre (tipo, i, j, W_ROOK,   unicode),
        P_Bispo (tipo, i, j, W_BISHOP, unicode),
        P_Cavalo(tipo, i, j, W_KNIGHT, unicode),
        P_Peao  (tipo, i, j, W_PAWN,   unicode),
        P_Rei   (tipo, i, j, B_KING,   unicode),
        P_Rainha(tipo, i, j, B_QUEEN,  unicode),
        P_Torre (tipo, i, j, B_ROOK,   unicode),
        P_Bispo (tipo, i, j, B_BISHOP, unicode),
        P_Cavalo(tipo, i, j, B_KNIGHT, unicode),
        P_Peao  (tipo, i, j, B_PAWN,   unicode)
    ][--id];
}