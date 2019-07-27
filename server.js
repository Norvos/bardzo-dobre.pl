import {default as app} from "./app";

app.set('port', process.env.NODE_PORT);

const server = app.listen(app.get("port"), () => {
  console.log(`Listening on port: ${server.address().port}`);
});