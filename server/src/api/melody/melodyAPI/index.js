const fs = require('fs');

const streamAudio = async (req, res, audioPath) => {
  const range = req.headers.range || '0';
  audioPath = `${__dirname}/../../../../uploads/${audioPath}`;
  const audioStat = await fs.promises.stat(audioPath);
  const audioSize = audioStat.size;
  const chunkSize = (1 * 1e6) / 2; //  1MB
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

module.exports = {
  streamAudio,
};
