
import { promises as fs } from 'fs';
import fse from 'fs-extra';
import { promisify } from 'util';
import { exec } from 'child_process';
import { default as rimraf_cb } from 'rimraf';

const rimraf = promisify(rimraf_cb);

const env = {
    ...process.env,
    //NODE_OPTIONS: '--openssl-legacy-provider',
    FFZ_EXTENSION: true
};

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd, options = {}) {
    return new Promise((resolve, reject) => {
        exec(cmd, options, (error, stdout, stderr) => {
            console.log(stdout);
            console.error(stderr);
            if (error) {
                reject(error);
            } else
                resolve(stdout);
        });
    });
}


// Calculate the version.

const main_manifest = JSON.parse(await fs.readFile('client/package.json'));

console.log('Client Version:', main_manifest.version);

let versioning;

try {
    versioning = JSON.parse(await fs.readFile('version.json'))
} catch {
    /* no-op */
}

if ( ! versioning )
    versioning = {
        last: null,
        revision: 0
    };

if ( main_manifest.version !== versioning.last ) {
    versioning.last = main_manifest.version;
    versioning.revision = 0;
} else {
    versioning.revision++;
}

console.log('Revision:', versioning.revision);
await fs.writeFile('version.json', JSON.stringify(versioning, null, '\t'));


// Build the client

process.chdir('client');
console.log(`Building client... (CWD: ${process.cwd()})`);
await execShellCommand('pnpm install', {
    env: {
        ...process.env,
        CI: true
    }
});
await execShellCommand('pnpm clean');
await execShellCommand('pnpm build', {
    env: {
        ...env,
        FFZ_BUILD: versioning.revision
    }
});
process.chdir('..');


// Build the addons

process.chdir('addons');
console.log(`Building addons... (CWD: ${process.cwd()})`);
await execShellCommand('pnpm install', {
    env: {
        ...process.env,
        CI: true
    }
});
await execShellCommand('pnpm clean');
await execShellCommand('pnpm build', {
    env
});
process.chdir('..');

console.log(`Packaging... (CWD: ${process.cwd()})`);

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
manifest.version = `${versioning.last}.${versioning.revision}`;

await fs.writeFile('dist/manifest.json', JSON.stringify(manifest, null, '\t'));
