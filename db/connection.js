const { connect, connection } = require("mongoose");
const { config } = require("dotenv");

exports.dbConnect = () => {
  config();
  connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  const db = connection;
  db.on("error", () => console.log("database connection fail"));
  db.once("open", () => console.log("databse conencted successfully"));
};