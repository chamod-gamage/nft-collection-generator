// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import request from 'request';
export default function handler(req, res) {
  const dir = './metadata/' + req.query.collection;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  console.log(req.query.collection);
  console.log(req.query.supply);
  console.log(req.body);
  const { metadata } = JSON.parse(req.body);
  console.log(JSON.parse(req.body).metadata);
  for (let i = 0; i < req.query.supply; i++) {
    fs.writeFileSync(`${dir}/${i}.json`, JSON.stringify(metadata));
  }
  const fileArr = [];
  fs.readdirSync(dir).forEach((file) => {
    fileArr.push(fs.createReadStream(`${dir}/${file}`));
  });
  sendRequest(fileArr);
  res.status(200).json({ message: 'Hello World!' });
}

function sendRequest(metadataFileStreams) {
  const options = {
    url: 'https://api.nftport.xyz/v0/metadata/directory',
    headers: { Authorization: process.env.NEXT_PUBLIC_NFTPORT_API_KEY },
  };

  const req = request.post(options, function (err, resp, body) {
    if (err) {
      console.error('Error: ' + err);
    } else {
      console.log('Response: ' + body);
    }
  });
  const form = req.form();
  metadataFileStreams.forEach((file) => {
    form.append('metadata_files', file);
  });
}
