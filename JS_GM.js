function canvasHouse (id) {
	let ctx = document.getElementById(id).getContext("2d");
	ctx.fillStyle = "red";
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(10, 35);
	ctx.lineTo(60, 10);
	ctx.lineTo(160, 10);
	ctx.lineTo(110, 35);
	ctx.moveTo(160, 10);
	ctx.lineTo(210, 35);
	ctx.lineTo(10, 35);
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = "green";
	ctx.fillRect(30, 35, 90, 40);
	ctx.strokeRect(30, 35, 90, 40);
	ctx.fillStyle = "blue";
	ctx.fillRect(120, 35, 70, 40);
	ctx.strokeRect(120, 35, 70, 40);
}