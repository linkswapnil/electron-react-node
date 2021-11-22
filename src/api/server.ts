import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 8080; // default port to listen

app.use(cors());
// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// define a route handler for the default home page
app.get('/', (_req, res) => {
  // render the index template
  res.json({ username: 'Flavio' });
});

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
