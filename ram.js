function init() {
	global.ram = [];
	/*for (var i = 0; i < 1024; i++) {
		global.ram[i] = 0x0;
	}*/
}

function reset() {
	global.ram = [];
}

module.exports.init = init;
module.exports.reset = reset;