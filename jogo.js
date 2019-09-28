const tabX = 7;
const tabY = 7;

const GAMESTATE_RUNNING = 0;
const GAMESTATE_GAMEOVER = 1;

function JogoXadrez() {
	// let _tabuleiro = new Tabuleiro();
	// for (var i = 0; i < 8; i++) {
	// 	_tabuleiro.addPeca(new P_Peao(P_WHITE, 6, i, W_PAWN, "♙"));
	// 	_tabuleiro.addPeca(new P_Peao(P_BLACK, 1, i, B_PAWN, "♟"));
	// 	switch (i) {
	// 		case 0:
	// 		case 7:
	// 			_tabuleiro.addPeca(new P_Torre(P_WHITE, 7, i, W_ROOK, "♖"));
	// 			_tabuleiro.addPeca(new P_Torre(P_BLACK, 0, i, B_ROOK, "♜"));
	// 			break;
	// 		case 1:
	// 		case 6:
	// 			_tabuleiro.addPeca(new P_Cavalo(P_WHITE, 7, i, W_KNIGHT, "♘"));
	// 			_tabuleiro.addPeca(new P_Cavalo(P_BLACK, 0, i, B_KNIGHT, "♞"));
	// 			break;
	// 		case 2:
	// 		case 5:
	// 			_tabuleiro.addPeca(new P_Bispo(P_WHITE, 7, i, W_BISHOP, "♗"));
	// 			_tabuleiro.addPeca(new P_Bispo(P_BLACK, 0, i, B_BISHOP, "♝"));
	// 			break;
	// 		case 3:
	// 			_tabuleiro.addPeca(new P_Rainha(P_WHITE, 7, i, W_QUEEN, "♕"));
	// 			_tabuleiro.addPeca(new P_Rainha(P_BLACK, 0, i, B_QUEEN, "♛"));
	// 			break;
	// 		case 4:
	// 			_tabuleiro.addPeca(new P_Rei(P_WHITE, 7, i, W_KING, "♔"));
	// 			_tabuleiro.addPeca(new P_Rei(P_BLACK, 0, i, B_KING, "♚"));
	// 			break;
	// 	}
	// }

	let _tabuleiro;
	let _jogadorAtual;// = P_WHITE;
	let _gameState = GAMESTATE_RUNNING;

	this.getTabuleiro = function() {
		// return tabuleiro.getRepresentacao();
		return _tabuleiro;
	}

	// Esse método reinicia o jogo.
	this.reiniciar = function() {
		_jogadorAtual = P_WHITE;
		_tabuleiro = new Tabuleiro();
		_gamestate = GAMESTATE_RUNNING;
		for (var i = 0; i < 8; i++) {
			_tabuleiro.addPeca(new P_Peao(P_WHITE, 6, i, W_PAWN, "♙"));
			_tabuleiro.addPeca(new P_Peao(P_BLACK, 1, i, B_PAWN, "♟"));
			switch (i) {
				case 0:
				case 7:
					_tabuleiro.addPeca(new P_Torre(P_WHITE, 7, i, W_ROOK, "♖"));
					_tabuleiro.addPeca(new P_Torre(P_BLACK, 0, i, B_ROOK, "♜"));
					break;
				case 1:
				case 6:
					_tabuleiro.addPeca(new P_Cavalo(P_WHITE, 7, i, W_KNIGHT, "♘"));
					_tabuleiro.addPeca(new P_Cavalo(P_BLACK, 0, i, B_KNIGHT, "♞"));
					break;
				case 2:
				case 5:
					_tabuleiro.addPeca(new P_Bispo(P_WHITE, 7, i, W_BISHOP, "♗"));
					_tabuleiro.addPeca(new P_Bispo(P_BLACK, 0, i, B_BISHOP, "♝"));
					break;
				case 3:
					_tabuleiro.addPeca(new P_Rainha(P_WHITE, 7, i, W_QUEEN, "♕"));
					_tabuleiro.addPeca(new P_Rainha(P_BLACK, 0, i, B_QUEEN, "♛"));
					break;
				case 4:
					_tabuleiro.addPeca(new P_Rei(P_WHITE, 7, i, W_KING, "♔"));
					_tabuleiro.addPeca(new P_Rei(P_BLACK, 0, i, B_KING, "♚"));
					break;
			}
		}
	}

	// Esse método retorna uma referência para o objeto peça que está na posição i,j do tabuleiro.
	// Se a posição não tiver uma peça pertencente ao jogador atual, esse método deve retornar null;
	this.getPeca = function(i, j) { var p = _tabuleiro.getPeca(i, j); return (p == undefined || p.getTipo() != _jogadorAtual) ? null : p; }

	this.getGameState = function() { return _gameState; }

	this.moverPeca = function(peca, i, j) {
		if (_gameState == GAMESTATE_RUNNING) {
			var move_res = peca.mover(_tabuleiro, i, j);
			if (move_res == MOVE_OK || move_res == MOVE_CAP) {
				var ret = _tabuleiro.regMovimento(peca, i, j);
				_jogadorAtual = (_jogadorAtual == P_WHITE ? P_BLACK : P_WHITE);
				if (ret != undefined) { 
					if (ret.getID() == W_KING || ret.getID() == B_KING) _gameState = GAMESTATE_GAMEOVER;
					return ret;
				}
				return true;
			}
			return false;
		}
		return false;
	}

	this.getMoveMap = function(peca) {
		var aux = [];
		for (var i = 0; i < 8; i++) {
			//console.log("\t"+i);
			aux[i] = [];
			for (var j = 0; j < 8; j++) {
				//console.log("\t\t"+j);
				aux[i][j] = peca.mover(_tabuleiro, i, j, false);
			}
		}
		return aux;
	}

	this.getJogadorAtualString = function() { return _jogadorAtual == P_WHITE ? "Branco" : "Preto"; }
	this.getJogadorAnteriorString = function() { return _jogadorAtual != P_WHITE ? "Branco" : "Preto"; }
	this.getJogadorAtualBool = function() { return _jogadorAtual == P_WHITE ? 0 : 1; }
	// this.getPeca = function(i, j) {
	// 	// Esse é um código de exemplo.
	// 	// <<<<<<<
	// 	if (i == peca.i && j == peca.j)
	// 		return peca;
	// 	// >>>>>>>
	// 	return null;
	// }

	// Esse método move a peça para a posição i, j do tabuleiro.
	// Se o movimento não for possível, esse método deve retornar false. Caso contrário, deve retornar true;
	// Não é necessário se preocupar com a existência de outra peça. Caso a posição final da peça esteja ocupada por outra, a peça deverá ser substituída pela nova.
	// Sempre que esse método for executado com sucesso (retornando true) o turno deve ser atualizado, passando o controle para o outro jogador. Obs: não é permitido que o usuário mova uma peça de outro jogador.
	// this.moverPeca = function(peca, i, j) {
	// 	// Não pode mover uma peça para fora do tabuleiro.
	// 	if (i > 7 || i < 0 || j > 7 || j < 0)
	// 		return false;

	// 	// Não pode mover uma peça para o mesmo lugar.
	// 	if (peca.i == i && peca.j == j)
	// 		return false;

	// 	// Esse é um comportamento de exemplo.
	// 	// <<<<<<<
	// 	tabuleiro[peca.i][peca.j] = 0;
	// 	tabuleiro[i][j] = peca.id;
	// 	peca.i = i;
	// 	peca.j = j;
	// 	// >>>>>>>
	// 	return true;
	// }
}
