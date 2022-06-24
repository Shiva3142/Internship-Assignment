const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

dotenv.config({
	path: "./config.env",
});

const adminId = process.env.ADMIN;
const Database = process.env.DATABASE;
let port = process.env.PORT || 80;

mongoose.connect(Database, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

db = mongoose.connection;
db.once("open", () => {
	console.log("connected to database");
});

let indiacovidcasesschema = new mongoose.Schema({
	date: String,
	total_confirmed: Number,
	total_recovered: Number,
	total_deaths: Number,
	total_active: Number,
	delta_confirmed: Number,
	delta_recovered: Number,
	delta_deaths: Number,
	delta_active: Number,
});

cases_types = [
	"total_confirmed",
	"total_recovered",
	"total_deaths",
	"total_active",
	"delta_confirmed",
	"delta_recovered",
	"delta_deaths",
	"delta_active",
];

let indiaCovidCases = mongoose.model("indiaCovidCases", indiacovidcasesschema);



	app.get("/publicaccess/:adminid", (req, res) => {
		// console.log(req.params);
		if (req.params.adminid == adminId) {
			indiaCovidCases.find({}, { _id: 0 }, (err, data) => {
				// console.log(data);
				// console.log(err);
				if (!err) {
					res.status(200).send(data);
				} else {
					res.status(404).send({ message: "Error in data fetching" });
				}
			});
		} else {
			res.status(404).send({ message: "You Don't Have an Access" });
		}
	});

	app.post("/gettotaldata", (req, res) => {
		// console.log(req.sessionID);
		indiaCovidCases.find({},{_id:0},(err, data) => {
			// console.log(data);
			// console.log(err);
			if (!err) {
				res.status(200).send(data);
			} else {
				res.status(404).send({ message: "Error" });
			}
		}).sort({date:-1});
	});

	app.post("/specific", async (req, res) => {
		// console.log(req.body);
		if (cases_types.indexOf(req.body.type) != -1) {
			type_value = req.body.type;
			let returned_data = [];
			switch (req.body.type) {
				case "total_confirmed":
					returned_data = await indiaCovidCases
						.find({}, { date: 1, total_confirmed: 1, _id: 0 })
						.sort({ date: 1 });
					break;
				case "total_recovered":
					returned_data = await indiaCovidCases
						.find({}, { date: 1, total_recovered: 1, _id: 0 })
						.sort({ date: 1 });
					break;
				case "total_deaths":
					returned_data = await indiaCovidCases
						.find({}, { date: 1, total_deaths: 1, _id: 0 })
						.sort({ date: 1 });
					break;
				case "total_active":
					returned_data = await indiaCovidCases
						.find({}, { date: 1, total_active: 1, _id: 0 })
						.sort({ date: 1 });
					break;
				case "delta_confirmed":
					returned_data = await indiaCovidCases
						.find({}, { date: 1, delta_confirmed: 1, _id: 0 })
						.sort({ date: 1 });
					break;
				case "delta_recovered":
					returned_data = await indiaCovidCases
						.find({}, { date: 1, delta_recovered: 1, _id: 0 })
						.sort({ date: 1 });
					break;
				case "delta_deaths":
					returned_data = await indiaCovidCases
						.find({}, { date: 1, delta_deaths: 1, _id: 0 })
						.sort({ date: 1 });
					break;
				case "delta_active":
					returned_data = await indiaCovidCases
						.find({}, { date: 1, delta_active: 1, _id: 0 })
						.sort({ date: 1 });
					break;
			}
			// console.log(returned_data);
			if (returned_data.length > 0) {
				res.status(200).send(returned_data);
			} else {
				res.status(404).send({ message: "Error" });
			}
		} else {
			res.status(404).send({ message: "Error" });
		}
	});

app.listen(port, () => {
	console.log("done \ngo and see at http://127.0.0.1:" + port);
});
