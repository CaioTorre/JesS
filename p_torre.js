function P_Torre(tipo, posI, posJ, ID, unic) {
    Peca.call(this, tipo, posI, posJ, ID, unic);
}

// Criando o prototype de P_Torre a partir do prototype da superclasse Peca
P_Torre.prototype = Object.create(Peca.prototype);

P_Torre.prototype.mover = function(tabuleiro, i, j) {
    var unit = function(a, b) {
        delta = a - b;
        return delta/Math.abs(delta);
    }
    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(this, tabuleiro, i, j) == MOVE_FAIL) return MOVE_FAIL;

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Torre não pode mudar simultaneamente de linha e de coluna
    if (this._i != i && this._j != j) return MOVE_FAIL;

    // Não podem haver peças entre a posição atual e a posição de destino
    var delta;
    if (this._i == i) {
        delta = unit(j, this._j);
        //for (var pj = this._j + delta; pj <= j; pj += delta) {
        for (var cont = 0; cont < Math.abs(this._j - j) - 1; cont++) {
            if (tabuleiro.getPeca(i, this._j + (cont + 1) * delta) != undefined) { return MOVE_FAIL; }
        }
    } else {
        delta = unit(i, this._i);
        for (var cont = 0; cont < Math.abs(this._i - i) - 1; cont++) {
            if (tabuleiro.getPeca(this._i + (cont + 1) * delta, j) != undefined) { return MOVE_FAIL; }
        }
    }
    
    // Checagem captura de peças
    return Peca.prototype.checkCap.call(this, tabuleiro, i, j);
}