const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('dist/manifest.json'));

manifest.version = `${process.env.FFZ_VERSION}.${process.env.FFZ_BUILD}`;

fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, '\t'));
