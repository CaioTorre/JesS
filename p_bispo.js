function P_Bispo(tipo, posI, posJ, ID, unic) {
    Peca.call(this, tipo, posI, posJ, ID, unic);
}

// Criando o prototype de P_Bispo a partir do prototype da superclasse Peca
P_Bispo.prototype = Object.create(Peca.prototype);

P_Bispo.prototype.mover = function(tabuleiro, i, j) {
    var unit = function(a, b) {
        delta = a - b;
        return delta/Math.abs(delta);
    }
    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(this, tabuleiro, i, j) == MOVE_FAIL) return MOVE_FAIL;

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Bispo só pode se mover na diagonal
    if (Math.abs(this._i - i) != Math.abs(this._j - j)) return MOVE_FAIL;

    // Não podem haver peças entre a posição atual e a posição de destino 
    var deltaI = unit(i, this._i);
    var deltaJ = unit(j, this._j);
    for (var cont = 0; cont < Math.abs(this._i - i) - 1; cont++) 
        if (tabuleiro.getPeca(this._i + (cont + 1) * deltaI, this._j + (cont + 1) * deltaJ) != undefined) return MOVE_FAIL;
    
    // Checagem captura de peças
    return Peca.prototype.checkCap.call(this, tabuleiro, i, j);
}