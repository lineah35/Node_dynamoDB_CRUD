const express = require('express'); //because we are creating a server; any third party packages we need to use globally
const app = express();
const port = 3000;
const hpRoutes = require('./routes/hp.routes'); //because we need to connect to the file
const cors = require('cors');
// app.use(cors({
//     origin: 'http://localhost:3001/'
// }));

// const corsOpts = {
//     origin: '*',
  
//     methods: [
//       'GET',
//       'POST',
//     ],
//   };

let corsOpts= {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
  
  app.use(cors(corsOpts));
  

app.use(express.json());

app.use('/hp', hpRoutes);


app.listen(port, () => {
    console.log("This app is running on port", port);
})