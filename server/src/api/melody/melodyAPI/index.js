const db = require('$base/models');
const fs = require('fs');

const streamAudio = async (req, res, audioPath) => {
  const range = req.headers.range || '0';
  audioPath = `${__dirname}/../../../../uploads/${audioPath}`;
  const audioStat = await fs.promises.stat(audioPath);
  const audioSize = audioStat.size;
  const chunkSize = (1 * 1e6) / 4; //  1MB
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + chunkSize, audioSize - 1);

  const contentLength = end - start + 1;
  console.log(audioSize, chunkSize);

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${audioSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'audio/mpeg',
  };
  res.writeHead(206, headers);

  const stream = fs.createReadStream(audioPath, { start, end });
  stream.pipe(res);
};

async function getGenre(genre) {
  if (genre === null || genre === undefined) {
    genre = await db.Genre.findAll({
      attributes: ['name'],
      raw: true,
    });
    //genre = genre.dataValues;
    let new_genre = [];
    for (let i = 0; i < genre.length; i++) {
      new_genre.push(genre[i].name);
    }
    genre = new_genre;
  }
  return genre;
}
async function getInstrument(instrument) {
  if (instrument === null || instrument === undefined) {
    instrument = await db.Instrument.findAll({
      attributes: ['name'],
      raw: true,
    });
    //genre = genre.dataValues;
    let new_instrument = [];
    for (let i = 0; i < instrument.length; i++) {
      new_instrument.push(instrument[i].name);
    }
    instrument = new_instrument;
  }
  return instrument;
}

module.exports = {
  streamAudio,
  getGenre,
  getInstrument,
};
