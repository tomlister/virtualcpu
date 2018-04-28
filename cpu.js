function load(input) {
	var program = Buffer.from(input, "hex");
	for (var i = 0; i < program.length; i++) {
		global.ram[i] = program[i];
	}
}
function execute(callback) {
	//program memory range 0x0 (0) - 0xB7 (183)
	var registers = {
		0xe0: 0x0, //ax
		0xe1: 0x0, //al
		0xe2: 0x0, //ah
		0xe3: 0x0, //es
		0xe4: 0x0 //si
	}
	var dne = false;
	var returnaddr = 0x0;
	for (var i = 0; i < 183; i++) {
		var kill = false;
		if (dne == false) {
			if (global.ram[i] == 0x01) { //mov
				//global.ram[global.ram[i+1]] = global.ram[i+2];
				if (global.ram[i+1] == 0xd0 && global.ram[i+3] == 0xd0) {
					global.ram[registers[global.ram[i+2]]] = global.ram[i+4];
					i += 4;
				} else {
					/*if (global.ram[i+2] !=) {
						registers[global.ram[i+1]] = global.ram[i+2];
						i += 2;
					} else {*/
						registers[global.ram[i+1]] = global.ram[i+2];
						i += 2;
					//}
				}
			} else if (global.ram[i] == 0x02) { //inc
				registers[global.ram[i+1]] += 1;
				i += 1;
			} else if (global.ram[i] == 0x03) { //db
				//global.ram[i-1] 
			} else if (global.ram[i] == 0x04) { //equ
				
			} else if (global.ram[i] == 0x05) { //cmp
				
			} else if (global.ram[i] == 0x06) { //jne
				
			} else if (global.ram[i] == 0x06) { //ret
				
			} else if (global.ram[i] == 0x07) { //call
				
			} else if (global.ram[i] == 0xd1) { //dne
				dne = true;
			} else if (global.ram[i] == 0xd2) { //edne
				dne = false;
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
}
module.exports.load = load;
module.exports.execute = execute;