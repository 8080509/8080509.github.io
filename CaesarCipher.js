function cipher(arr, ranges) {
	let shiftArr = [];
	for (let i = 0; i < arr.length; i++) {
		let val0 = arr[i];
		for (let j =  0; j < ranges.length; j++) {
			let size = (ranges[j][1] - ranges[j][0] + 1);
			if (val0 >= ranges[j][0] && val0 <= ranges[j][1]) {
				val0 += ranges[j][2];
				while (val0 < ranges[j][0]) {val0 += size};
				while (val0 > ranges[j][1]) {val0 -= size};
			};
		};
		shiftArr[i] = val0;
	};
	return shiftArr;
};

function invRange(ranges) {
	let newRanges = [];
	for (let i = 0; i < ranges.length; i++) {
		let j = ranges.length - i - 1;
		newRanges[j] = ranges[i];
		newRanges[j][2] *= -1;
	};
	return newRanges;
};

function setDisp(disp, ranges) {
	let newRanges = [];
	for (let i = 0; i < ranges.length; i++) {
		newRanges[i] = ranges[i];
		newRanges[i][2] = disp;
	};
	return newRanges;
};

function inputField(id) {return document.getElementById(id).value;};

function charCodeArr(str) {return str.split('').map(function(i) {return i.charCodeAt(0);});};

function chCoArrToString(arr) {return arr.map(function(i) {return String.fromCharCode(i);}).join('');};

function outputField(id, str) {document.getElementById(id).value = str;};

function demo4chCoArrIn(idIn, idOut) {outputField(idOut, JSON.stringify(charCodeArr(inputField(idIn))));};

function demo4basicRangesArr(id) {
	outputField(id, JSON.stringify([
		[65,90,0],//A - Z
		[97,122,0],// a - z
		[192,222,0],//&Agrave - &THORN
		[223,255,0],//&szlig - &yuml
		[256,383,0],//&Amacr - #0319 (no html encoding)
		[384,591,0]//U+0180 - U+024F
	]));
};

function demo4rangesArr(idDisp, idRange, idOut) {outputField(idOut, JSON.stringify(setDisp(parseInt(inputField(idDisp)), JSON.parse(inputField(idRange)))));};

function demo4invRangesArr(idIn, idOut) {outputField(idOut, JSON.stringify(invRange(JSON.parse(inputField(idIn)))));};

function demo4chCoArrOut(idArr, idRange, idOut) {outputField(idOut, JSON.stringify(cipher(JSON.parse(inputField(idArr)),JSON.parse(inputField(idRange)))));};

function demo4output(idIn, idOut) {outputField(idOut, chCoArrToString(JSON.parse(inputField(idIn))));};