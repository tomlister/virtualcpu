var cpu = require("./cpu.js")
var ram = require("./ram.js")
var vga = require("./vga.js")
var ssd = require("./ssd.js")
var bios = require("./bios.js")

function main() {
	ram.init();
	ssd.init();
	vga.start();
	bios.boot(cpu, vga, ram, ssd);
}
main();