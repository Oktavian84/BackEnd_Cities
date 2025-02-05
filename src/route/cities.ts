import express from "express";
import { body } from "express-validator";
import { index, show, store, update, destroy } from "../controller/cities_controllers";

const router = express.Router();

router.get("/", index);

router.get("/:cityId", show);

router.post("/", [
    body("city_name")
		.isString().withMessage("has to be a string").bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage("has to be 3-191 chars long")
], store);

router.patch("/:cityId", [
    body("city_name")
		.optional()
		.isString().withMessage("has to be a string").bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage("has to be 3-191 chars long"),

		body("city_location")
		.optional()
		.isString().withMessage("title has to be a string").bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 chars"),

		body("city_population")
		.optional()
		.isString().withMessage("title has to be a string").bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 chars"),
		
		body("city_description")
		.optional()
		.isString().withMessage("title has to be a string").bail()
		.trim().isLength({ min: 3, max: 600 }).withMessage("title has to be 3-600 chars")

], update);

router.delete("/:cityId", destroy);

export default router;
