const app = require("./app");
const connectDatabase = require("./config/database");

connectDatabase();

app.listen(process.env.REACT_APP_PORT, () => {
  console.log(
    `server started on port:' ${process.env.REACT_APP_PORT} in ${process.env.REACT_APP_NODE_ENV} mode`
  );
});
