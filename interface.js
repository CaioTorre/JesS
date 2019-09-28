var jogo = new JogoXadrez();

function init() {
	gerar_tabuleiro();
	gerar_listaPecas();
	reiniciar_jogo();
	atualizar_jogo();
}

function select(i,j) {
	if (jogo.getGameState() != GAMESTATE_RUNNING) return;

	var tabuleiro = document.getElementById('tabuleiro');
	var obj = tabuleiro.rows[i].cells[j]

	if (select.obj_clicado === undefined || select.obj_clicado === null) {
		var peca = jogo.getPeca(i, j);

		if (peca == null)
			return;

		select.obj_clicado = obj;
		select.obj_bgcolor = obj.style.backgroundColor;
		select.peca = peca;
		obj.style.backgroundColor = "green";

		var mmap = jogo.getMoveMap(peca);
		for (var _i = 0; _i < 8; _i++) {
			for (var _j = 0; _j < 8; _j++) {
				if (!(_i == i && _j == j)) {
					switch (mmap[_i][_j]) {
						case MOVE_OK:
							tabuleiro.rows[_i].cells[_j].style.backgroundColor = "lime";
							break;
						case MOVE_CAP:
							tabuleiro.rows[_i].cells[_j].style.backgroundColor = "fuchsia";
							break;
						case MOVE_FAIL:
							tabuleiro.rows[_i].cells[_j].style.backgroundColor = (((_i + _j) % 2 == 0 ? "white" : "silver"));
							break;
						
					}
				}
			}
		}
	} else if (select.peca.getI() == i && select.peca.getJ() == j) { // Des-selecionando uma peça
		select.obj_clicado.style.backgroundColor = select.obj_bgcolor;
		select.obj_clicado = null;
		refresh_BGs();
	} else { 
		var ret = jogo.moverPeca(select.peca, i, j);
		if (ret === true) { //Movimento normal
			select.obj_clicado.style.backgroundColor = select.obj_bgcolor;
			select.obj_clicado = null;
			atualizar_jogo();
			refresh_BGs();
		} else if (ret === false) { //Movimento inválido
			alert("Movimento invalido!");
			select.obj_clicado.style.backgroundColor = select.obj_bgcolor;
			select.obj_clicado = null;
			refresh_BGs();
		} else { //Captura de peças
			document.getElementById('capPieces').rows[1 - jogo.getJogadorAtualBool()].cells[1].innerHTML += ret.getUnicode();
			select.obj_clicado.style.backgroundColor = select.obj_bgcolor;
			select.obj_clicado = null;
			atualizar_jogo();
			refresh_BGs();
			if (jogo.getGameState() == GAMESTATE_GAMEOVER) alert("Fim do jogo\nVencedor: " + jogo.getJogadorAnteriorString())
		}
	}
}

function refresh_BGs() {
	for (var i = 0; i < 8; i++)
		for (var j = 0; j < 8; j++)
			tabuleiro.rows[i].cells[j].style.backgroundColor = (((i + j) % 2 == 0 ? "white" : "silver"));
}

function atualizar_jogo() {
	const pecas = ["", "♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"];
	let tabuleiro = document.getElementById('tabuleiro');
	let tabData = jogo.getTabuleiro();
	var peca;

	for (var i = 0, n = tabuleiro.rows.length; i < n; i++) {
		for (var j = 0, m = tabuleiro.rows[i].cells.length; j < m; j++) {
			peca = tabData.getPeca(i, j);
			if (peca != undefined) {
				tabuleiro.rows[i].cells[j].innerHTML = peca.getUnicode();
			} else tabuleiro.rows[i].cells[j].innerHTML = "&nbsp";
		}
	}

	// Javascript will throw an error when init-ing before the body is created
	if (document.getElementById("jogAtualDisp") != undefined)
		document.getElementById("jogAtualDisp").innerHTML = jogo.getJogadorAtualString();
}

function reiniciar_jogo() {
	jogo.reiniciar();
	atualizar_jogo();
	zerar_listaPecas();
}

function gerar_tabuleiro() {
	var table = "<table id=\"tabuleiro\">";
	var color = false;

	for (var i = 0; i < 8; i++) {
		table += "<tr>";
		for (var j = 0; j < 8; j++) {
			if (color) {
				table += "<td id=\"i" + i + "j" + j + "\" bgcolor=\"silver\" onclick=\"select(" + i + "," + j + ");\"></td>";
			} else {
				table += "<td id=\"i" + i + "j" + j + "\" bgcolor=\"white\" onclick=\"select(" + i + "," + j + ");\"></td>";
			}

			color = !color;
		}
		table += "</tr>";
		color = !color;
	}
	table += "</table>";
	document.write(table);
}

function gerar_listaPecas() {
	var table = "<table id=\"capPieces\">";
	var nomes = ["Branco", "Preto"];
	for (var i = 0; i < 2; i++) {
		table += "<tr>";
		table += "<td bgcolor=\"white\">" + nomes[i] + "</td>";
		table += "<td id=\"p_list" + i + "\" bgcolor=\"white\"></td>";
		table += "</tr>";
	}
	table += "</table>";
	document.write(table);
}

function zerar_listaPecas() {
	// Javascript will throw an error when init-ing before the body is created
	if (document.getElementById("capPieces") != undefined) 
		for (var i = 0; i < 2; i++) 
			document.getElementById("capPieces").rows[i].cells[1].innerHTML = "";
}

init();