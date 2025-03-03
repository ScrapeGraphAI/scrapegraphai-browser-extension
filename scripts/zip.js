import { createWriteStream } from 'fs';
import archiver from 'archiver';
import path from 'path';

async function zipDistFolder() {
  const output = createWriteStream(path.resolve('scrapegraphai_extension.zip'));
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`Success! zip file created. Size: ${archive.pointer()} byte`);
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  archive.directory(path.resolve('dist'), false);

  await archive.finalize();
}

zipDistFolder().catch((err) => console.error('Error during zip file creation:', err));
