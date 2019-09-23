function P_Cavalo(tipo, posI, posJ, ID) {
    Peca.call(tipo, posI, posJ, ID);
}

// Criando o prototype de P_Cavalo a partir do prototype da superclasse Peca
P_Cavalo.prototype = Object.create(Peca.prototype);

P_Cavalo.prototype.mover = function(tabuleiro, i, j) {
    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(tabuleiro, i, j) == false) return false;

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Cavalo só pode se mover em L
    if (Math.abs(this._i - i) > 2) return false;
    if (Math.abs(this._j - j) > 2) return false;
    if (this._i == i) return false;
    if (this._j == j) return false;
    if (Math.abs(this._i - i) + Math.abs(this._j - j) != 3) return false;

    // Caso contrario, movimento válido
    return true;
}