import { createWriteStream } from 'fs';
import archiver from 'archiver';
import path from 'path';

async function zipDistFolder() {
  const output = createWriteStream(path.resolve('scrapegraphai_extension.zip'));
  const archive = archiver('zip', { zlib: { level: 9 } }); // Livello massimo di compressione

  output.on('close', () => {
    console.log(`dist.zip creato con successo. Dimensione: ${archive.pointer()} byte`);
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  // Aggiungi la cartella dist al file zip
  archive.directory(path.resolve('dist'), false);

  await archive.finalize();
}

zipDistFolder().catch((err) => console.error('Errore durante la creazione dello zip:', err));
