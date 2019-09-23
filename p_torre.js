function P_Torre(tipo, posI, posJ, ID) {
    Peca.call(tipo, posI, posJ, ID);
}

// Criando o prototype de P_Torre a partir do prototype da superclasse Peca
P_Torre.prototype = Object.create(Peca.prototype);

P_Torre.prototype.mover = function(tabuleiro, i, j) {
    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(tabuleiro, i, j) == false) return false;

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Torre não pode mudar simultaneamente de linha e de coluna
    if (this._i != i && this._j != j) return false;

    // Não podem haver peças entre a posição atual e a posição de destino
    if (this._i == i) {
        for (var pj = this._j; pj < j; pj++)
            if (tabuleiro.getPeca(i, pj) != undefined) return false;
    } else {
        for (var pi = this._i; pi < i; pi++)
            if (tabuleiro.getPeca(pi, j) != undefined) return false;
    }

    // Caso contrario, movimento válido
    return true;
}