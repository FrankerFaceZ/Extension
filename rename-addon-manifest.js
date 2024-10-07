const fs = require('fs');

for(const file of fs.readdirSync('dist/web')) {
	if ( /^addons\.([a-z0-9]+)\.json$/i.test(file) ) {
		console.log(`Renaming ${file} to addons.json`);
		fs.renameSync(`dist/web/${file}`, 'dist/web/addons.json');
		break;
	}
}