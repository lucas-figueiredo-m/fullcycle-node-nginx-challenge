const express = require("express");
const mysql = require("mysql");
const fs = require("fs");

const port = 8080;

const app = express();

const databaseName = "nodedb";
const tableName = "people";

const sql_select = `SELECT * FROM ${tableName}`;
const sql_insert = (name) => `INSERT INTO people(name) values('${name}')`;
const sql_createdb = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
const sql_createtable = `CREATE TABLE IF NOT EXISTS ${tableName}(id int not null auto_increment, name varchar(255), primary key(id))`;

const config = {
  host: "db",
  user: "root",
  password: "root",
  // database: "nodedb",
};

const connection = mysql.createConnection(config);

connection.query(sql_createdb, (err, result) => {
  if (err) throw err;
  console.log("Database created!");
});

connection.changeUser({ database: databaseName });

connection.query(sql_createtable, (err, result) => {
  if (err) throw err;
  console.log("Table created!");
});

app.get("/create-name", (req, res, next) => {
  const { name } = req.query;
  connection.query(sql_insert(name));
  res.header("Refresh", "1").status(200).send();
});

app.get("/", async (_, res) => {
  connection.query(sql_select, (err, result) => {
    if (err) throw err;
    const html = [];
    html.push("<ul>");
    result.map((item) => html.push(`<li>${item.name}</li>`));

    const content = fs.readFileSync(__dirname + "/index.html");
    const newStringHtml = content
      .toString()
      .replace("<ul></ul>", html.join(""));
    res.send(newStringHtml);
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
