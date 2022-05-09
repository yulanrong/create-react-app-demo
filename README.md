# create-react-app-demo

a full stack demo using create-react-app for the frontend and express for the backend(database: postgresql)

## Steps:

- `npm init`: initialize and create package.json file

- `npm i express`: install express

- `npm i nodemon --save-dev`: install nodemon to keep watching updates from server

- `npm i pg`: install postgresql

- add a `server.js` file, and in `package.json` file, add "start": "node server.js", "server": "nodemon server.js" inside "scripts"

- inside `server.js`, now we can setup our server

```
const express = require("express");
const app = express();
const port = 3001;
/*
  since the frontend already used 3000 by default, we should use different port for backend
*/

/*
  sample api endpoint '/hello', if need to call external api, then we can use fetch or axios(need to npm install axios)
*/
app.get("/hello", (req, res) => {
  const sample = { data: "hello world" };
  res.send(JSON.stringify(sample.data));

  // axios.get('external api link').then(response => res.send(response.data));
});

app.listen(port, () => console.log(`listening to port ${port}`));
```

- now we can run `npm run server` in terminal and open localhost:3001/hello, we will see "hello world". Then our basic server is setup now.

- to use database(postgresql) for server, we can create a database folder `db`, and inside the `db` folder, we can create a `index.js` to connect database and `schema.sql` for schema design.

- after we have designed the database, we can run `psql postgres` and `\i db/schema.sql` to setup database locally (note that you might need a password for your postgresql database);

- then we can link our local database to the server, inside `db/index.js`, we need to connect our database:

```
const { Pool } = require("pg");

const pool = new Pool({
  user: CONFIG.user,
  host: "localhost",  //by default
  database: CONFIG.database,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (err, client) => {
  console.log("error on idle postgres pool", err);
  process.exit(-1);
});

module.exports.pool = pool;
```

-- now we can use our database in server, in `server.js`, we can define `const db = require('./db');`, then we can call sql query by using `db.pool.query('query').then(response)` in express.

- and in next step, we will setup our frontend; `npx create-react-app client `: create a frontend 'client' using create-react-app; after installed, you can follow the README.md in client folder to start your frontend.

- since frontend and backend are using different port, we need to connect backend server to frontend, open the `client/package.json`, add `"proxy": "http://localhost:3001"`. now we can directly call api from server using fetch or axios(need to be installed);

- now we can work on frontend components using our server in `localhost:3000` by running `npm start` when in client directory.
