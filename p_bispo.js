function P_Bispo(tipo, posI, posJ, ID, unic) {
    Peca.call(this, tipo, posI, posJ, ID, unic);
}

// Criando o prototype de P_Bispo a partir do prototype da superclasse Peca
P_Bispo.prototype = Object.create(Peca.prototype);

P_Bispo.prototype.mover = function(tabuleiro, i, j) {
    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(this, tabuleiro, i, j) == MOVE_FAIL) return MOVE_FAIL;

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Bispo só pode se mover na diagonal
    if (Math.abs(this._i - i) != Math.abs(this._j - j)) return MOVE_FAIL;

    // Não podem haver peças entre a posição atual e a posição de destino
    for (var pi = this._i; pi < i; pi++) 
        if (tabuleiro.getPeca(pi, pi) != undefined) return MOVE_FAIL;

    // Caso contrario, movimento válido
    return MOVE_OK;
}