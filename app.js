require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database");

app.use(bodyParser.json());

app.route("/test").get(function (req, res, next) {
    connection.query("SELECT * FROM patient", function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

app.post("/get-user-details", (req, res, next) => {
    connection.query(`SELECT * FROM patient WHERE id_patient = "${req.body.id}"`, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post("/add-patient", (req, res, next) => {
    var sql = `INSERT INTO patient (firstname, lastname, birthnumber, email, tel_number, diabetes_type, birthdate, id_doctor) VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.birthnumber}', '${req.body.email}', '${req.body.tel_number}', '${req.body.diabetes_type}', '${req.body.birthdate}', '1')`;
    connection.query(sql, function (err, data) {
        if (err) {
            console.log("error", err);
            // some error occured
            res.json(JSON.stringify({ status: "error" }));
        } else {
            console.log("success");
            // successfully inserted into db
            res.json(JSON.stringify({ status: "success" }));
        }
    });
});

app.post("/get-patient-details", (req, res, next) => {
    connection.query(`SELECT * FROM glykemia WHERE id_patient = "${req.body.id}"`, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post("/set-patient-details", (req, res, next) => {
    console.log(req.body);
    const sql = `INSERT INTO glykemia (date_meassurment, value_glykem, units_inzulin, id_patient) VALUES 
    ('${req.body.date_meassurment}', '${req.body.value_glykem}', '${req.body.units_inzulin}', '${req.body.id_patient}')`;

    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.log("error", err);
            // some error occured
            res.json(JSON.stringify({ status: "error" }));
        } else {
            console.log("success");
            // successfully inserted into db
            res.json(JSON.stringify({ status: "success" }));
        }
    });
});

app.get("/status", (req, res) => res.send("Working!"));

// Port 8080 for Google App Engine
app.set("port", process.env.PORT || 3306);
app.listen(3306);
