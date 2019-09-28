function P_Rei(tipo, posI, posJ, ID, unic) {
    Peca.call(this, tipo, posI, posJ, ID, unic);
}

// Criando o prototype de P_Bispo a partir do prototype da superclasse Peca
P_Rei.prototype = Object.create(Peca.prototype);

P_Rei.prototype.mover = function(tabuleiro, i, j) {
    var unit = function(a, b) {
        delta = a - b;
        return delta/Math.abs(delta);
    }
    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(this, tabuleiro, i, j) == MOVE_FAIL) return MOVE_FAIL;

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Rei só pode andar uma casa
    if (Math.abs(this._i - i) > 1 || Math.abs(this._j - j) > 1) return MOVE_FAIL;

    // Rei não pode ir para alguma posição que o deixe em xeque

    // Checagem captura de peças
    return Peca.prototype.checkCap.call(this, tabuleiro, i, j);
}