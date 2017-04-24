const fs = require('fs');
const path = require('path');
const express = require('express');
const parse = require('./parse');

const PORT = process.argv[2] || process.env.TLMC_PORT || 80;
const TLMC_PATH = process.argv[3] || process.env.TLMC_PATH || '/mnt/TouhouBox/tlmc';

/* eslint-disable no-console */
console.log('Reading TLMC directory...');
const directory = parse.ls(TLMC_PATH);
const songs = parse.enumSongs(directory);

console.log('Checking file paths...');
const failed = songs.filter(song => {
  try {
    fs.accessSync(path.join(TLMC_PATH, song), fs.constants.R_OK);
    return false;
  }
  catch (error) {
    return true;
  }
});

if (failed.length) {
  console.log(`${failed.length} songs not found:`);
  console.log(failed.join('\n'));
}
else {
  console.log('All OK!');
}

const app = express();
const directoryString = JSON.stringify(directory);

app.use('/tlmc', express.static(TLMC_PATH));
app.get('/ls', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(directoryString);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
/* eslint-enable no-console */
