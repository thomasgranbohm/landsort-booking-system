const express = require("express");
const next = require("next");
const { isNil } = require("ramda");

// import express from "express";
// import next from "next";
// import { isNil } from "ramda";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.get("/bokningsläget", (req, res) => {
		app.render(req, res, "/bokningslaget");
	});

	server.get("*", (req, res) => {
		const url = new URL(req.url, "http://localhost:3000");
		const { pathname, searchParams } = url;
		if (
			pathname === "/bokningsl%C3%A4get" ||
			pathname === "/bokningslaget"
		) {
			const getankomstdatum = searchParams.get("ankomstdatum");
			const getavresedatum = searchParams.get("avresedatum");
			if (!getankomstdatum || !getavresedatum) res.redirect("/");

			const start_date = new Date(getankomstdatum);
			const end_date = new Date(getavresedatum);
			if (isNil(start_date) || isNil(end_date)) res.redirect("/");
			else {
				app.render(req, res, "/bokningslaget", req.query);
			}
		} else {
			handle(req, res);
		}
	});

	server.listen(3000, () =>
		console.log("Listening on http://localhost:3000")
	);
});
