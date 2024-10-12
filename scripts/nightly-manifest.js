const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('dist/manifest.json'));

manifest.name = 'FrankerFaceZ Nightly';
manifest.short_name = 'FFZ-Nightly';

manifest.description = `THIS IS THE NIGHTLY BUILD OF FRANKERFACEZ. This extension is for TESTING. Users who aren't interested in testing should use the stable extension.  ${manifest.description}`;

if (manifest?.browser_specific_settings?.gecko)
    manifest.browser_specific_settings.gecko.id = 'nightly@frankerfacez.com';

fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, '\t'));
