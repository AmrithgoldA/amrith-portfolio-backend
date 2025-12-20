import Express from "express";
const app = Express();
const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}/`);
});
