const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('dist/manifest.json'));

manifest.name = 'FrankerFaceZ Testing';
manifest.short_name = 'FFZ-Testing';

manifest.description = `This is the testing version of FrankerFaceZ. ${manifest.description}`;

if (manifest?.browser_specific_settings?.gecko)
    manifest.browser_specific_settings.gecko.id = 'testing@frankerfacez.com';

fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, '\t'));
