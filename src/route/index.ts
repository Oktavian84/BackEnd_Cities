import express from "express";
import citiesRouter from "./cities";

const router = express.Router();

router.get("/", (req, res) => {
	res.send({
		message: "Cities",
	});
});

router.use("/cities", citiesRouter);

router.use((req, res) => {
	
	res.status(404).send({
		message: `Cannot ${req.method} ${req.path}`,
	});
});

export default router;