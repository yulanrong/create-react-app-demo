const express = require("express");
const db = require("./db");
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
  // db.pool.query('sql query').then(response)

  // axios.get('external api link').then(response => res.send(response.data));
});

app.listen(port, () => console.log(`listening to port ${port}`));
