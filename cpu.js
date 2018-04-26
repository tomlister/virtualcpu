function load(input) {
	var program = Buffer.from(input, "hex");
	for (var i = 0; i < program.length; i++) {
		global.ram[i] = program[i];
	}
}
function execute(callback) {
	//program memory range 0x0 (0) - 0xB7 (183)
	for (var i = 0; i < 183; i++) {
		var kill = false;
		if (global.ram[i] == 0x01) { //mov
			global.ram[global.ram[i+1]] = global.ram[i+2];
			i += 2;
		} else if (global.ram.length == i) { //end
			console.log(global.ram[i]);
			kill = true;
			break;
		} else if (global.ram[i] == 0x0) { //noop
		} else if (undefined) {
			global.ram[i] = 0x0;
		}
		if (kill == true) {
			//callback();
			console.log("Killing...")
			break;
		}
	}
}
module.exports.load = load;
module.exports.execute = execute;