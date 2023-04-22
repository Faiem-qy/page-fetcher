const request = require('request');
const fs = require('fs');

//Print a message

let args = process.argv.slice(2);
//From the user, take the : 1.URL and 2.file path -> argv and use callbacks for grabbing the url
const fetcher = function(callback) {

  request(args[0] + args[1], (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      const data = body;
      callback(null, data);
    }
  });

};

fetcher((error, data) => {
  if (error) {
    console.log("Error:", error);
  } else {
    //Download file
    fs.writeFile('responseFile.txt', data, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File saved successfully");
        console.log(`Downloaded and saved ${getFilesizeInBytes('responseFile.txt')} bytes to ${args[1]}`);
      }
    });
  }
});

function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  console.log(fileSizeInBytes);
  return fileSizeInBytes;

}

