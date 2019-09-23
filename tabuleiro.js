function Tabuleiro() {
    this._tab = [];
    //const pecasUnicode = ["", "♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"];

    for (var i = 0; i < 8; i++) this._tab[i] = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];

    this.addPeca = function(peca) {
        // Já existe uma peça nesta posição
        if (this._tab[peca.getI()][peca.getJ()] != undefined) return false;

        // Adicione a peça e retorne sucesso
        this._tab[peca.getI()][peca.getJ()] = peca;
        return true;
    }

    this.rmPeca = function(i, j) {
        // Não existe peça a ser removida
        if (this._tab[i][j] == undefined) return undefined;

        //Remova a peça e retorne-a
        var temp = this._tab[i][j];
        this._tab[i][j] = undefined;
        return temp;
    }

    this.getPeca = function(i, j) {
        // Não existe peça a ser buscada
        if (this._tab[i][j] == undefined) return undefined;

        // Retorne a referencia à peça exigida
        return this._tab[i][j];
    }

    this.getRepresentacao = function() {
        // Criando um vetor de vetores e preenchendo com os IDs de cada peça em _tab
        var temp = [];
        for (var i = 0; i < 8; i++) {
            temp[i] = [];
            for (var j = 0; j < 8; j++) {
                temp[i][j] = this._tab[i][j].getID();
            }
        }

        // Retorne a representação
        return temp;
    }
}