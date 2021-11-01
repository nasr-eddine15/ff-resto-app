const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql");

app.use(cors());
app.use(express.static("./public"));

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./frontend/public/images/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// can configure this as an evironment variable later for security purposes
const initialCon = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "password",
});

initialCon.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  initialCon.query("CREATE DATABASE IF NOT EXISTS restodb", (err, result) => {
    if (err) throw err;
    console.log("Database created");
  });
});

const con = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "password",
  database: "restodb",
});

const sql =
  "CREATE TABLE IF NOT EXISTS restaraunts (idRestaraunt INT AUTO_INCREMENT, code VARCHAR(10), name VARCHAR(50), address VARCHAR(100), image VARCHAR(100), PRIMARY KEY (idRestaraunt)); CREATE TABLE IF NOT EXISTS dishes (idDish INT PRIMARY KEY AUTO_INCREMENT, idRestaraunt INT, name VARCHAR(50), cost INT(100), image VARCHAR(100), FOREIGN KEY (idRestaraunt) REFERENCES restaraunts(idRestaraunt) ON DELETE CASCADE)";

con.query(sql, (err, result) => {
  if (err) throw err;
  console.log("Restaraunts and dishes tables created");
});

app.get("/", (req, res) => {
  console.log("Server is ready");
});

app.get("/api/restaraunts", (req, res) => {
  con.query("SELECT * FROM restaraunts", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/api/addRestaraunt", upload.single("image"), (req, res) => {
  if (!req.file) {
    console.log("No file upload");
  } else {
    const code = req.body.code;
    const name = req.body.name;
    const address = req.body.address;
    const imgsrc = "http://127.0.0.1:3000/images/" + req.file.filename;

    const sql =
      "INSERT INTO Restaraunts (code, name, address, image) VALUES (?, ?, ?, ?)";
    con.query(sql, [code, name, address, imgsrc], (err, result) => {
      if (err) throw err;
      res.send("Restaraunt added!");
    });
  }
});

app.post("/api/deleteRestaraunt/:id", (req, res) => {
  const idRestaraunt = req.params.id;
  var sql = "DELETE FROM restaraunts WHERE idRestaraunt = ?";
  con.query(sql, [idRestaraunt], (err, result) => {
    if (err) throw err;
    res.send("Number of records deleted: " + result.affectedRows);
  });
});

app.get("/api/addDish", () => {});
app.get("/api/deleteDish", () => {});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serving at http://localhost:${port}`);
});
