const replace = require('replace-in-file');
const options = {

  //Single file
  files: 'dist/index.html',
  files: [
    'dist/index.html',
    'dist/static/css/*.css'
  ],

  //Replacement to make (string or regex)
  replace: /\/static/g,
  with: './static',

  //Specify if empty/invalid file paths are allowed, defaults to false.
  //If set to true these paths will fail silently and no error will be thrown.
  allowEmptyPaths: false,
};

replace(options)
  .then(changedFiles => {
    console.log('Modified files:', changedFiles.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });