function P_Bispo(tipo, posI, posJ, ID) {
    Peca.call(tipo, posI, posJ, ID);
}

// Criando o prototype de P_Bispo a partir do prototype da superclasse Peca
P_Bispo.prototype = Object.create(Peca.prototype);

P_Bispo.prototype.mover = function(tabuleiro, i, j) {
    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(tabuleiro, i, j) == false) return false;

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Bispo só pode se mover na diagonal
    if (Math.abs(this._i - i) != Math.abs(this._j - j)) return false;

    // Não podem haver peças entre a posição atual e a posição de destino
    for (var pi = this._i; pi < i; pi++) 
        if (tabuleiro.getPeca(pi, pi) != undefined) return false;

    // Caso contrario, movimento válido
    return true;
}