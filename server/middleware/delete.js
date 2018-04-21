// // Imports the Google Cloud client library
// const Storage = require('@google-cloud/storage');

// // Creates a client
// const storage = new Storage();

// storage
//   .bucket(process.env.GCS_BUCKET)
//   .file(filename)
//   .delete()
//   .then(() => {
//     console.log(`gs://${process.env.GCS_BUCKET}/${filename} deleted.`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });