const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('dist/manifest.json'));

manifest.name = 'FrankerFaceZ Nightly';
manifest.short_name = 'FFZ-Nightly';

manifest.description = `This is the nightly testing build of FrankerFaceZ. FrankerFaceZ is an enhancement suite for Twitch.`;

if (manifest?.browser_specific_settings?.gecko)
    manifest.browser_specific_settings.gecko.id = 'nightly@frankerfacez.com';

fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, '\t'));
