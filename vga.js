var displayloop;
var cache = [];
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
	//vga memory 0xb8 (184) - 0x1B8 (440)
	var vgamem = [];
	var x = 0;
	for (var i = 184; i < 440; i++) {
		vgamem[x] = ram[i]
		x += 1;
	}
	if (cache != vgamem) {
		var prints = arr_diff(cache, vgamem);
		/*var converted = "";
		for (var i = 0; i < vgamem.length; i++) {
			converted += String.fromCharCode(vgamem[i]);
		}*/
		//process.stdout.write("\033c");
		for (var z = 0; z < prints.length; z++) {
			process.stdout.write(String.fromCharCode(prints[z]));
		}
		cache = vgamem;
	}
}
function start() {
	displayloop = setInterval(memrun,1);
}
function kill() {
	clearInterval(displayloop);
}

module.exports.start = start;
module.exports.kill = kill;