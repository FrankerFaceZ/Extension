const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('dist/manifest.json'));

manifest.name = 'FrankerFaceZ Testing';
manifest.short_name = 'FFZ-Testing';

manifest.description = `This is the testing Version of FrankerFaceZ. ${manifest.description}`;

fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, '\t'));
