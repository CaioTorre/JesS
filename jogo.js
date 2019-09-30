const tabX = 7;
const tabY = 7;

const GAMESTATE_RUNNING = 0;
const GAMESTATE_GAMEOVER = 1;
const GAMESTATE_REVIVING = 2;

function JogoXadrez() {
	let _tabuleiro;
	let _jogadorAtual;// = P_WHITE;
	let _gameState = GAMESTATE_RUNNING;
	let _danglingPawn = undefined;

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
				if (ret != undefined) { 
					if (ret.getID() == W_KING || ret.getID() == B_KING) _gameState = GAMESTATE_GAMEOVER;
					//_jogadorAtual = (_jogadorAtual == P_WHITE ? P_BLACK : P_WHITE);
					//return ret;
				}
				if (peca.getID() == W_PAWN && i == 0) {
					_danglingPawn = peca;
					this.triggerRevive();
				} else if (peca.getID() == B_PAWN && i == 7) {
					_danglingPawn = peca;
					this.triggerRevive();
				} else {
					_jogadorAtual = (_jogadorAtual == P_WHITE ? P_BLACK : P_WHITE);
				}
				if (ret != undefined) return ret;
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

	// this.getMMap = function(peca) { return _tabuleiro.getMMap(peca); }

	this.getJogadorAtualString = function() { return _jogadorAtual == P_WHITE ? "Branco" : "Preto"; }
	this.getJogadorAnteriorString = function() { return _jogadorAtual != P_WHITE ? "Branco" : "Preto"; }
	this.getJogadorAtualBool = function() { return _jogadorAtual == P_WHITE ? 0 : 1; }

	this.revivePiece = function(tipo, id) {
		console.log("Revive called " + arguments[0] + ", " + arguments[1]);
		if (this._gameState == GAMESTATE_REVIVING) {
			if (tipo == this._jogadorAtual) {
				console.log("Check matched");
				_tabuleiro.rmPeca(_danglingPawn.getI(), _danglingPawn.getJ());
				// Criar nova peca a partir do que foi selecionado
				_tabuleiro.addPeca(Peca.prototype.autoCreate.call(null, tipo, _danglingPawn.getI(), _danglingPawn.getJ(), id))
				_danglingPawn = undefined;
				this._gameState = GAMESTATE_RUNNING;
				// Atualizar jogador atual
				_jogadorAtual = (_jogadorAtual == P_WHITE ? P_BLACK : P_WHITE);
				atualizar_jogo();
			}
		}
		//console.log("Selecionada peca " + tipo + ", " + id + " (" + Peca.prototype.getUnicodeID.call(null, id) + ")");
		//console.log("Selecionada peca tipo {}, id {}, unicode {}".format(tipo, id, Peca.prototype.getUnicodeID.call(null, id)));
	}

	this.triggerRevive = function() {

		this._gameState = GAMESTATE_REVIVING;
		alert("Escolha uma peça para converter o peão");
	}
}
