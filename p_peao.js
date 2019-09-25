function P_Peao(tipo, posI, posJ, ID) {
    Peca.call(this, tipo, posI, posJ, ID);
    this._firstmove = true;
}

// Criando o prototype de P_Peao a partir do prototype da superclasse Peca
P_Peao.prototype = Object.create(Peca.prototype);

P_Peao.prototype.mover = function(tabuleiro, i, j) {
    // Reaproveitar código da superclasse Peca
    if (Peca.prototype.mover.call(tabuleiro, i, j) == false) return false;

    // Caso contrario, verificar movimentos daquela peça individualmente
    // Peão nunca pode mudar mais do que uma coluna
    if (Math.abs(this._j - j) > 1) return false;

    // Peão não pode andar na diagonal a menos que seja para comer uma peça
    if (this._j != j && tabuleiro.getPeca(i, j) == undefined) return false;

    // Peão não pode andar para trás
    if (moveMod * this.tipo * (this._i - i) < 0) return false;

    // Peão nunca pode andar mais do que duas casas
    if (moveMod * this.tipo * (this._i - i) > 2) return false;

    // Peão não pode andar mais do que uma casa após o primeiro movimento
    if (!this._firstmove && moveMod * this.tipo * (this._i - i) > 1) return false;

    // Não podem haver peças entre a posição atual e a posição de destino
    for (var im = 0; im < moveMod * this.tipo * (this._i - i); im++) {
        if (tabuleiro.getPeca(this._i + moveMod * this.tipo * (im + 1), this._j) != undefined) return false;
    }

    // Caso contrario, movimento válido
    this._firstmove = false;
    return true;
}