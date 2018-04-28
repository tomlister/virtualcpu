var fs = require('fs');
var inputfile = process.argv[2]
var outfile = process.argv[3]

var ops = {
	mov: "01",
	inc: "02"
}

var regs = {
	ax: "e0",
	al: "e1",
	ah: "e2",
	es: "e3",
	si: "e4"
}

var funcs = {
}

var final;

function convertbase (num) {
	return {
    	from : function (baseFrom) {
            return {
                to : function (baseTo) {
                    return parseInt(num, baseFrom).toString(baseTo);
                }
            };
        }
    };
};

function assemble(input) {
	var build = "";
	var array = input.split(" ");
	console.log(array);
	for (var i = 0; i < array.length; i++) {
		if (array[i] == "mov") { //mov
			build += ops[array[i]];
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
		} else if (array[i] == "inc") { //inc
			build += ops[array[i]];
			build += regs[array[i+1]];
			i += 1;
		} else if (array[i].match(/(\w+[:])/)) { //functions
			var convaddr = convertbase(i+1).from(10).to(16);
			funcs[array[i].replace(':', '')] = convaddr;
			build += "d1"; //do not execute instructions (dne)
			i += 1;
		} else if (array[i] == "ret") { //functions
			build += "06";
			build += "d2"; //end of dne
			i += 1;
		} else if (array[i] == "call") { //call
			build += "07";
			build += funcs[array[i+1]];
			i += 2;
		}
	}
	final = Buffer.from(build, "hex");
	console.log(final)
	fs.writeFileSync(outfile, final)
}

fs.readFile(inputfile, function(err, data) {
    if(err) throw err;
    //var array = data.toString().split("\n");
    assemble(data.toString().replace(/\n/g,' '));
});