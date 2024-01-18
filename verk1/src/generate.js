
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { createDirIfNotExists, readFilesFromDir } from './lib/file.js';
import { generateBoilerplate, generateIndex, generateLeikir, generateStada } from './lib/html.js';


const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';

const OUTPUT_FILES =
  {
    'index.html': generateIndex,
    'leikir.html': generateLeikir,
    'stada.html': generateStada
  };

async function generate() {
  const gamedayData = await readFilesFromDir(INPUT_DIR);
  await createDirIfNotExists(OUTPUT_DIR);

  Object.keys(OUTPUT_FILES).forEach(title => {
    writeFile(
      join(OUTPUT_DIR, title), generateBoilerplate(title, OUTPUT_FILES[title], gamedayData)
      );
  });
}

generate();
