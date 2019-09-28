function P_Torre(tipo, posI, posJ, ID, unic) {
    Peca.call(this, tipo, posI, posJ, ID, unic);
}

// Criando o prototype de P_Torre a partir do prototype da superclasse Peca
P_Torre.prototype = Object.create(Peca.prototype);

P_Torre.prototype.mover = function(tabuleiro, i, j) {
    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(this, tabuleiro, i, j) == MOVE_FAIL) return MOVE_FAIL;

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Torre não pode mudar simultaneamente de linha e de coluna
    if (this._i != i && this._j != j) return MOVE_FAIL;

    // Checagem captura de peças
    if (tabuleiro.getPeca(i, j) != undefined) return MOVE_CAP;

    // Não podem haver peças entre a posição atual e a posição de destino
    if (this._i == i) {
        for (var pj = this._j; pj < j; pj++)
            if (tabuleiro.getPeca(i, pj) != undefined) return MOVE_FAIL;
    } else {
        for (var pi = this._i; pi < i; pi++)
            if (tabuleiro.getPeca(pi, j) != undefined) return MOVE_FAIL;
    }

    // Caso contrario, movimento válido
    return MOVE_OK;
}