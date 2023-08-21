import { promises as fs } from 'fs';
import fse from 'fs-extra';
import { promisify } from 'util';
import { exec } from 'child_process';
import gitPullOrClone from 'git-pull-or-clone';
import { default as rimraf_cb } from 'rimraf';

const rimraf = promisify(rimraf_cb);
const pull = promisify(gitPullOrClone);

console.log('Clearing existing paths.');

await rimraf('client');
await rimraf('addons');

console.log('Pulling client...');

await pull('https://github.com/FrankerFaceZ/FrankerFaceZ.git', 'client');

console.log('Pulling add-ons...');

await pull('https://github.com/FrankerFaceZ/Add-Ons.git', 'addons');
