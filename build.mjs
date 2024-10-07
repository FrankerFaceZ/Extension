
import { promises as fs } from 'fs';
import fse from 'fs-extra';
import { promisify } from 'util';
import { default as rimraf_cb } from 'rimraf';

const rimraf = promisify(rimraf_cb);


// Build the extension folder

await rimraf('dist');
await fs.mkdir('dist');
await fs.mkdir('dist/web');

// Copy the built files

await fse.copy('client/dist', 'dist/web', {
    errorOnExist: true
});

await fse.copy('addons/dist', 'dist/web', {
    errorOnExist: true
});


// Find the addons.*.json file and rename it.

for(const file of await fs.readdir('dist/web')) {
    if ( /^addons\.([a-z0-9]+)\.json$/i.test(file) ) {
        await fs.rename(`dist/web/${file}`, 'dist/web/addons.json');
    }
}


// Copy the remaining files.

await fse.copy('src', 'dist', {
    overwrite: true
});

// Now, edit the manifest to include a version.

const manifest = JSON.parse(await fs.readFile('dist/manifest.json'));
manifest.version = `${process.env.FFZ_VERSION}.${process.env.FFZ_BUILD}`;

await fs.writeFile('dist/manifest.json', JSON.stringify(manifest, null, '\t'));
