const fs = require("fs");
function init() {
	global.ssd = [];
}

function load(filename) {
	fs.readFile(filename, (err, data) => {
 		if (err) throw err;
 		var contents = JSON.parse(data);
 		var buff = Buffer.from(contents.data, "base64")
 		for (var i = 0; i < buff.length; i++) {
			global.ssd[i] = buff[i];
		}
	});
}

module.exports.load = load;
module.exports.init = init;