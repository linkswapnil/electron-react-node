import express from 'express';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import { Parser } from 'json2csv';

const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// define a route handler for the default home page
app.get('/', (_req, res) => {
  // render the index template
  res.json({ username: 'Flavio' });
});


app.post("/addcsv" , (req,res) => {
  var appendThis = {
      Total : req.body.total,
      Name : req.body.name,
  }
  var newLine = '\r\n';
  var fields:any = ['Total', 'Name'];

  var toCsv = {
    data: appendThis,
    fields: fields,
    header: false,
  };

fs.stat('file.csv', function (err) {
  if (err == null) {
    console.log('File exists');

    //write the actual data and end with newline
    // var csv = json2csv(toCsv) + newLine;
    try {
        const parser = new Parser(toCsv);
        const csv = parser.parse(appendThis);
        console.log(csv);
        fs.appendFile('file.csv', csv, function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
          });
      } catch (err) {
        console.error(err);
      }
  } else {
    //write the headers and newline
    console.log('New file, just writing headers');
    fields = fields + newLine;

    fs.writeFile('file.csv', fields, function (err) {
      if (err) throw err;
      console.log('file saved');
    });
  }
});
  res.send("File Added...");
 })

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
