function P_Rainha(tipo, posI, posJ, ID, unic) {
    Peca.call(this, tipo, posI, posJ, ID, unic);
}

// Criando o prototype de P_Bispo a partir do prototype da superclasse Peca
P_Rainha.prototype = Object.create(Peca.prototype);

P_Rainha.prototype.mover = function(tabuleiro, i, j) {
    var unit = function(a, b) {
        delta = a - b;
        return delta/Math.abs(delta);
    }
    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(this, tabuleiro, i, j) == MOVE_FAIL) return MOVE_FAIL;

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Rainha só pode se mover como bispo ou como torre (reaproveitando os códigos)
    var b_state = P_Bispo.prototype.mover.call(this, tabuleiro, i, j);
    var t_state = P_Torre.prototype.mover.call(this, tabuleiro, i, j);
    if (b_state == MOVE_FAIL) {
        return t_state;
    } else {
        return b_state;
    }
}