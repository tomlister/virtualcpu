var fs = require('fs');
var inputfile = process.argv[2]
var outfile = process.argv[3]

var ops = {
	mov: "01",
	inc: "02"
}

var regs = {
	ax: "e0"
}

var final;

function assemble(input) {
	var build = "";
	var array = input.split(" ");
	console.log(array);
	for (var i = 0; i < array.length; i++) {
		build += ops[array[i]];
		if (array[i] == "mov") {
			if (array[i+1].match(/([\[\]])/)) {
				var stripped = array[i+1].replace('[','').replace(']','').replace(',','')
				build += "d0"+regs[stripped]+"d0";
			} else {
				build += regs[array[i+1].replace(',','')];
			}
			if (array[i+2] != undefined) {
				build += array[i+2].substring(2);
			}
			i += 2;
		} else if (array[i] == "inc") {
			build += regs[array[i+1]];
			i += 1;
		}
	}
	final = Buffer.from(build, "hex");
	fs.writeFile(outfile, final)
}

fs.readFile(inputfile, function(err, data) {
    if(err) throw err;
    //var array = data.toString().split("\n");
    assemble(data.toString().replace(/\n/g,' '));
});