var displayloop;
var cache = [0x0];
function arr_diff(a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
    return diff;
}

function memrun() {
	//vga memory 0xb8 (184) - 0x1058 (4184)
	//display size 100 columns * 40 rows
	var vgamem = [];
	var y = 0;
	var count = 0; 
	for (var i = 184; i < 4184; i++) {
		if (global.ram[i] == 0x1B) {
			cache = [];
			vgamem = [];
			process.stdout.write("\033c");
			break;
		} else if (global.ram[i] != undefined) {
			/*if (count == 100 || count == 200 || count == 300 || count == 400) {
				vgamem[y] = ram[i]
				vgamem[y+1] = 13;
				y += 2;
			} else {*/
				vgamem[y] = global.ram[i]
				y += 1;
			//}
		}
	}
	if (cache.toString() != vgamem.toString()) {
		var prints = vgamem.filter(x => !cache.includes(x));
		//var prints = arr_diff(vgamem, cache);
		for (var z = 0; z < prints.length; z++) {
			if (prints[z] == 13) {
				process.stdout.write("\n");
			}
			process.stdout.write(String.fromCharCode(prints[z]));
		}
		cache = vgamem;
	}
}
function start() {
	process.stdout.write("\x1Bc ");
	displayloop = setInterval(memrun,1);
}
function kill() {
	clearInterval(displayloop);
}

function flush(callback) {
	kill();
	start();
	callback();
}


module.exports.start = start;
module.exports.kill = kill;
module.exports.flush = flush;