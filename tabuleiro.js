function Tabuleiro() {
    this._tab = [];
    const INIT_TAB = undefined;
    for (var i = 0; i < 8; i++) this._tab[i] = [INIT_TAB, INIT_TAB, INIT_TAB, INIT_TAB, INIT_TAB, INIT_TAB, INIT_TAB, INIT_TAB];

    this._getCoord = function(i, j) { return this._tab[i][j]; }//Facil se precisar mudar a ordem
    this._setCoord = function(item, i, j) { this._tab[i][j] = item; }//Facil se precisar mudar a ordem

    //const pecasUnicode = ["", "♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"];
    
    this.addPeca = function(peca) {
        // Já existe uma peça nesta posição
        //if (this._tab[peca.getI()][peca.getJ()] != INIT_TAB) return false;
        if (this._getCoord(peca.getI(), peca.getJ()) != INIT_TAB) return false;

        // Adicione a peça e retorne sucesso
        //this._tab[peca.getI()][peca.getJ()] = peca;
        this._setCoord(peca, peca.getI(), peca.getJ());
        return true;
    }

    this.rmPeca = function(i, j) {
        // Não existe peça a ser removida
        //if (this._tab[i][j] == INIT_TAB) return undefined;
        if (this._getCoord(i, j) == INIT_TAB) return undefined;

        //Remova a peça e retorne-a
        //var temp = this._tab[i][j];
        //this._tab[i][j] = undefined;
        var temp = this._getCoord(i, j);
        this._setCoord(INIT_TAB, i, j);
        return temp;
    }

    this.getPeca = function(i, j) {
        // Não existe peça a ser buscada
        //if (this._tab[i][j] == INIT_TAB) return undefined;
        if (this._getCoord(i, j) == INIT_TAB) return undefined;

        //console.log("hit on getpeca");
        // Retorne a referencia à peça exigida
        //return this._tab[i][j];
        return this._getCoord(i, j);
    }

    this.getRepresentacao = function() {
        // Criando um vetor de vetores e preenchendo com os IDs de cada peça em _tab
        var temp = [];
        for (var i = 0; i < 8; i++) {
            temp[i] = [];
            for (var j = 0; j < 8; j++) {
                //temp[i][j] = this._tab[i][j].getID();
                temp[i][j] = this._getCoord(i, j).getID();
            }
        }

        // Retorne a representação
        return temp;
    }

    this.regMovimento = function(peca, i, j) {
        var aux;
        if (this._tab[i][j] != INIT_TAB) {
            aux = this._getCoord(i, j);
        }
        var auxI = peca.getI();
        var auxJ = peca.getJ();
        this._setCoord(peca, i, j);
        this._setCoord(INIT_TAB, auxI, auxJ);
        peca.setI(i);
        peca.setJ(j);
        return aux;
    }
}