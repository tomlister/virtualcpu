var cpu = require("./cpu.js")
var ram = require("./ram.js")
var vga = require("./vga.js")

function main() {
	ram.init();
	vga.start();
	cpu.load("01b84801b96501ba79");
	cpu.execute();
}
main();