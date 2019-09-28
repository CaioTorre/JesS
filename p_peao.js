function P_Peao(tipo, posI, posJ, ID, unic) {
    Peca.call(this, tipo, posI, posJ, ID, unic);
    this._firstmove = true;
}

// Criando o prototype de P_Peao a partir do prototype da superclasse Peca
P_Peao.prototype = Object.create(Peca.prototype);

P_Peao.prototype.mover = function(tabuleiro, i, j) {
    console.log("Checking move for pawn");

    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(this, tabuleiro, i, j) == MOVE_FAIL) return MOVE_FAIL;
    console.log("Base call succeeded"); 

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Peão nunca pode mudar mais do que uma coluna
    if (Math.abs(this._j - j) > 1) return MOVE_FAIL;
    console.log("Col limit ok");

    // Peão não pode andar na diagonal a menos que seja para comer uma peça
    if (this.__movemod * this._tipo * (this._i - i) == 1 && Math.abs(this._j - j) == 1) {
        if (tabuleiro.getPeca(i, j) != undefined) return MOVE_CAP;
        return MOVE_FAIL;
    }
    console.log("Diag ok");

    // Peão não pode andar para trás
    if (this.__movemod * this._tipo * (this._i - i) < 0) return MOVE_FAIL;
    console.log("Backtrack ok");

    // Peão nunca pode andar mais do que duas casas
    if (this.__movemod * this._tipo * (this._i - i) > 2) return MOVE_FAIL;
    console.log("Row limit ok");

    // Peão não pode andar mais do que uma casa após o primeiro movimento
    if (!this._firstmove && this.__movemod * this._tipo * (this._i - i) > 1) return MOVE_FAIL;
    console.log("Non first ok");

    // Não podem haver peças entre a posição atual e a posição de destino
    for (var im = 0; im < this.__movemod * this._tipo * (this._i - i); im++) {
        if (tabuleiro.getPeca(this._i + -1 * this.__movemod * this._tipo * (im + 1), this._j) != undefined) return MOVE_FAIL;
    }
    console.log("No blocks ok");

    // Caso contrario, movimento válido
    this._firstmove = false;
    return MOVE_OK;
}