const request = require('request');
const fs = require('fs');
const fsp = require('fs').promises;

let args = process.argv.slice(2);

request(args[0] + args[1], (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.

  async function fetcher() {
    try {
      const content = body;
      await fsp.writeFile('responseFile.txt', content);
    } catch (err) {
      console.log(err);
    }
  }
  fetcher();

  function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats.size;
    console.log(fileSizeInBytes);
    return fileSizeInBytes;

  }

  console.log(`Downloaded and saved ${getFilesizeInBytes('responseFile.txt')} bytes to ${args[1]}`);
});


