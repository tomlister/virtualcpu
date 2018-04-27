var screenoffset = 0;
function flush(callback) {
	for (var i = 0; i < 4000; i++) {
		global.ram[0xb8+i] = undefined;
	}
	//global.ram[0xb8] = 0x1B; 
	screenoffset = 0;
}

function printf(string) {
	var sp = string.split('');
	for (var i = 0; i < sp.length; i++) {
		global.ram[184+screenoffset+i] = sp[i].charCodeAt();
	}
}
function boot(cpu, vga, ram) {
	var bootmessage = "			*\n\n\n	*		*\n\n		     *\n\n\n\n		*\nAustralian Megatrends\nvbios 1.0\n";
	printf(bootmessage);
	screenoffset = bootmessage.length;
	printf("Loading...\n");
	setTimeout(function(){
		ram.reset();
		vga.flush(function(){
			setTimeout(function(){
				cpu.load(global.ssd);
				cpu.execute();
			},1000)
		});
	},1000);
}

module.exports.boot = boot;