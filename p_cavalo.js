function P_Cavalo(tipo, posI, posJ, ID, unic) {
    Peca.call(this, tipo, posI, posJ, ID, unic);
}

// Criando o prototype de P_Cavalo a partir do prototype da superclasse Peca
P_Cavalo.prototype = Object.create(Peca.prototype);

P_Cavalo.prototype.mover = function(tabuleiro, i, j) {
    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(this, tabuleiro, i, j) == MOVE_FAIL) return MOVE_FAIL;

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Cavalo só pode se mover em L
    if (Math.abs(this._i - i) > 2) return MOVE_FAIL;
    if (Math.abs(this._j - j) > 2) return MOVE_FAIL;
    if (this._i == i) return MOVE_FAIL;
    if (this._j == j) return MOVE_FAIL;
    if (Math.abs(this._i - i) + Math.abs(this._j - j) != 3) return MOVE_FAIL;

    // Checagem captura de peças
    return Peca.prototype.checkCap.call(this, tabuleiro, i, j);
}