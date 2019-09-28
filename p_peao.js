function P_Peao(tipo, posI, posJ, ID, unic) {
    Peca.call(this, tipo, posI, posJ, ID, unic);
    this._firstmove = true;
}

// Criando o prototype de P_Peao a partir do prototype da superclasse Peca
P_Peao.prototype = Object.create(Peca.prototype);

P_Peao.prototype.mover = function(tabuleiro, i, j, write) {
    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(this, tabuleiro, i, j) == MOVE_FAIL) return MOVE_FAIL;

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Peão nunca pode mudar mais do que uma coluna
    if (Math.abs(this._j - j) > 1) return MOVE_FAIL;

    var moveQuant = this.__movemod * this._tipo * (this._i - i);
    // Peão não pode andar na diagonal a menos que seja para comer uma peça
    if (moveQuant == 1 && Math.abs(this._j - j) == 1) {
        if (tabuleiro.getPeca(i, j) != undefined) return MOVE_CAP;
        return MOVE_FAIL;
    }

    if (moveQuant == 2 && Math.abs(this._j - j) > 0) return MOVE_FAIL;

    // Peão não pode andar para trás nem ficar na mesma linha
    if (moveQuant <= 0) return MOVE_FAIL;

    // Peão nunca pode andar mais do que duas casas
    if (moveQuant > 2) return MOVE_FAIL;

    // Peão não pode andar mais do que uma casa após o primeiro movimento
    if (!this._firstmove && moveQuant > 1) return MOVE_FAIL;

    // Não podem haver peças entre a posição atual e a posição de destino
    for (var im = 0; im < moveQuant; im++) {
        if (tabuleiro.getPeca(this._i + -1 * this.__movemod * this._tipo * (im + 1), this._j) != undefined) return MOVE_FAIL;
    }

    // // Checagem captura de peças
    var mstate = Peca.prototype.checkCap.call(this, tabuleiro, i, j);
    if (mstate != MOVE_FAIL && (write === undefined || write === true)) this._firstmove = false;
    return mstate;
}