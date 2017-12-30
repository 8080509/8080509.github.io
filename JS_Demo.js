/*arrayIn(stIn) {
	let stArr = stIn.split("");
	let i = 0;
	let newArr = [];
	while (stArr[i] != '[') {i++};
	while (stArr[i] != ']') {
	}
}*/

function boxArr(id) {return document.getElementById(id).value.split(',').map(function(i) {return parseFloat(i);});};

function boxOut(id, stOut) {document.getElementById(id).value = stOut;}

function mergSorted(a1, a2) {
    let i = 0;
    let j = 0;
	a1.push(Infinity);
	a2.push(Infinity);
    let a3 = [];
    for (let k = 0; k < (a1.length + a2.length - 2); k++) {
    	if (a1[i] < a2[j]) {
        	a3[k] = a1[i];
            i++;
        } else {
        	a3[k] = a2[j];
            j++;
        }
    }
    return a3;
}

function checkSorted(a1) {
	let sorted = true;
	for (let i = 1; i < a1.length; i++) {
		sorted = (a1[i-1] > a1[i])? false : sorted;
	}
	return sorted;
}

function demo1(in1, in2, out1) {
	let arr1 = boxArr(in1);
	let arr2 = boxArr(in2);
	let output = "";
	if (arr1.some(function(i) {return isNaN(i);}) || arr2.some(function(i) {return isNaN(i);})) {
		output = "At least one input did not make sense.";
	} else if(checkSorted(arr1) && checkSorted(arr2)) {
		let arr3 = mergSorted(arr1, arr2);
		output = arr3.join(', ');
	} else {
		output = "At least one intput was not sorted.";
	}
	boxOut(out1, output);
}

function mTabCell(i1,i2) {
	let output = '';
	if (i1 === 0 || i2 === 0) {
		if(i1 === i2) {
			output = '<th>X</th>';
		} else {
			output = '<th>' + (i1 + i2) + '</th>';
		}
	} else {
		output = '<td>' + (i1 * i2) + '</td>';
	}
	return output;
}

function demo2(in1, in2, out1) {
	let rMax = parseInt(document.getElementById(in1).value);
	let cMax = parseInt(document.getElementById(in2).value);
	let output = '';
	if ( isNaN(rMax) || isNaN(cMax) ) {
		output = 'At least one input is not a number.';
	} else {
		output = '<table>';
		for (let r = 0; r <= rMax; r++) {
			output += '<tr>';
			for (let c = 0; c <= cMax; c++) {
				output += mTabCell(r,c);
			}
			output += '</tr>';
		}
		output += '</table>';
	}
	document.getElementById(out1).innerHTML = output;
};

///*


function TicTacToeBoard(a) { //constructor for the TicTacToeBoard class.  Takes the value for content.
	
	this.content = a.map(function(i) {return i;});
	
	this.rWin = function(p) { // checks for victory on a row for the given player.
		let prev;
		let rV;
		let tV = false;
		for (let r = 0; r < 3; r++) {
			prev = p;
			rV = true;
			for (let c = 0; c < 3; c++) {
				rV = (this.content[(3 * r) + c] === prev)? rV : false;
			}
			tV = rV? true : tV;
		}
		return tV;
	};
	
	this.cWin = function(p) { // checks for victory on a collumn for the given player.
		let prev;
		let cV;
		let tV = false;
		for (let c = 0; c < 3; c++) {
			prev = p;
			cV = true;
			for (let r = 0; r < 3; r++) {
				cV = (this.content[(3 * r) + c] === prev)? cV : false;
			}
			tV = cV? true : tV;
		}
		return tV;
	};
	
	this.dWin = function(p) {return ((this.content[4] === p) && ((this.content[0] === p && this.content [8] === p) || (this.content[2] === p && this.content[6] === p)));}; // checks for victory on a diagonal for a given player.
	
	this.win = function(p) {return (this.rWin(p) || this.cWin(p) || this.dWin(p));};
	
	this.play = function(p, m) { //updates board after player p makes move m.
		let success;
		if (this.content[m] === 0) {
			this.content[m] = p;
			success = true;
		} else {
			success = false;
		}
		return success;
	};
	
	this.scan = function(p1, p2, sp) { //scans possible outcomes to determine favorable moves.  p1 is who it checks for victory.  sp is who gets to start.
		/*let boards = [];
		let pVictory = [];
		let gVictory = [];
		let pLoss = [];
		let mSeq = [];
		let d = 0;*/
		let gV = false;
		let pV = 0;
		let pL = false;
		if(this.win(p1)) {
			gV = true;
			pV = 1;
		} else if (this.win(p2)) {
			pL = true;
		} else if (this.content.some(function(j) {return j === 0;})) {
			let i = 0;
			let b;
			let bOutcome = [];
			let np = (sp === p1)? p2 : p1;
			let stop = false;
			switch (sp) {
				case p1:
					gV = false;
					pL = true;
					break;
				case p2:
					gV = true;
					pL = false;
			}
			while (!stop && i < 9) {
				b = new TicTacToeBoard(this.content);
				if (b.play(sp, i)) {
					bOutcome = b.scan(p1, p2, np);
				} else {
					bOutcome = undefined;
				}
				if ((typeof bOutcome) === 'object') {
					switch (sp) {
						case p1:
							gV = bOutcome[0]? true : gV;
							pV += bOutcome[1];
							pL = bOutcome[2]? pL : false;
							stop = gV;
							break;
						case p2:
							gV = bOutcome[0]? gV : false;
							pV += bOutcome[1];
							pL = bOutcome[2]? true : pL;
					}
				}
				i++;
			}
		}
		return [gV, pV, pL];
	};
	
	this.bestMove = function(p1, p2) { // returns what spot to move for best chance of success.  Plays for p1, assumes it is p1's move.
		let found = false;
		let i = 0;
		let outcomes = [];
		let m;
		while(!found && i < 9) {
			let b = new TicTacToeBoard(this.content);
			if(b.play(p1, i)) {
				outcomes[i] = b.scan(p1, p2, p2);
				found = outcomes[i][0];
			}
			i++;
		}
		if(found) {
			m = i - 1;
		} else {
			let temp = outcomes.filter(function(j) {return !j[2];}); // creates array temp, which is the set of all outcomes where there is not a way for the opponent to force victory.
			temp = (temp === [])? outcomes : temp;
			let k = 0;
			for(let l = 0; l < temp.length; l++) {
				k = (temp[l][1] > temp[k][1])? l : k;
			}
			m = outcomes.indexOf(temp[k]);
		}
		return m;
	};
	
	this.playBestMove = function(p1, p2) {this.play(p1, this.bestMove(p1, p2));};
	
}

let d3game = {
	restart: function() {
		this.board = new TicTacToeBoard([0,0,0,0,0,0,0,0,0]);
		this.h1 = undefined;
		this.h2 = undefined;
		this.turn = 1;
		this.tabId = undefined;
	}
};

function demo3start(pl1, pl2, tableId) {
	d3game.restart();
	d3game.h1 = document.getElementById(pl1).checked;
	d3game.h2 = document.getElementById(pl2).checked;
	d3game.tabId = tableId;
	demo3updateBoard(d3game.tabId, true, '');
	demo3compPlay();
}

function demo3play(m) {
	if((d3game.turn === 1 && d3game.h1) || (d3game.turn === 2 && d3game.h2)){
		if (d3game.board.play(d3game.turn, m)) {
			demo3endTurn();
		}
	}
	demo3compPlay();
}

function demo3compPlay() {
	while(!((d3game.turn === 1 && d3game.h1) || (d3game.turn === 2 && d3game.h2) || d3game.board.win(1) || d3game.board.win(2) || d3game.board.content.indexOf(0) === -1)) {
		d3game.board.playBestMove(d3game.turn, 3 - d3game.turn);
		demo3endTurn();
	}
}

function demo3updateBoard(tableId, clickable, message) {
	let tab = '';
	for(let r = 0; r < 3; r++) {
		tab += '<tr>';
		for(let c = 0; c < 3; c++) {
			let value = '&nbsp';
			let command = '';
			switch (d3game.board.content[(3 * r) + c]) {
				case 1:
					value = 'X';
					break;
				case 2:
					value = 'O';
			}
			if (clickable) {command =  ' onclick = "demo3play(' + ((3 * r) + c) + ')"';};
			tab += ('<td><button' + command + '>' + value + '</button></td>');
		}
		tab += '</tr>';
	}
	tab += '<tr><td colspan = "3">' + message + '</td></tr>';
	document.getElementById(tableId).innerHTML = tab;
}

function demo3endTurn() {
	let done = true;
	let msg = '';
	if (d3game.board.win(1)) {
		msg = 'Player one wins!';
	} else if (d3game.board.win(2)) {
		msg = 'Player two wins!';
	} else if (d3game.board.content.indexOf(0) === -1){
		msg = 'Nobody wins.';
	} else {done = false;};
	d3game.turn = 3 - d3game.turn;
	demo3updateBoard(d3game.tabId, !done, msg);
}

//*/



