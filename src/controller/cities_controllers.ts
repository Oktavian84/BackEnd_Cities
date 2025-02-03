import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { handlePrismaError } from "../exceptions/prisma";
import prisma from "../prisma";
import { CreateCity, UpdateCityData } from "../types/citiestypes";


const debug = Debug("Cities:cities_controller");

export const index = async (req: Request, res: Response) => {
	try {
		const cities = await prisma.cities.findMany();
		res.send({ status: "success", data: cities});

	} catch (err) {
		debug("Error when trying to query for all Cities: %O", err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

export const show = async (req: Request, res: Response) => {
	const cityId = Number(req.params.cityId);
	if (!cityId) {
		res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
		return;
	}

	try {
		const city = await prisma.cities.findUniqueOrThrow({
			where: {
				id: cityId,
			}
		});
		res.send({ status: "success", data: city });

	} catch (err) {
		debug("Error when trying to query for City #%d: %O", cityId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

export const store = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		});
		return;
	}

	// Get only the validated data
	const validatedData: CreateCity = matchedData(req);
	
	try {
		const city = await prisma.cities.create({
			data: validatedData,
		});
		res.status(201).send({ status: "success", data: city});

	} catch (err) {
		debug("Error when trying to create a City: %O", err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

export const update = async (req: Request, res: Response) => {
	const cityId = Number(req.params.cityId);
	if (!cityId) {
		res.status(400).send({ message: "That is not a valid ID" });
		return;
	}

	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		});
		return;
	}

	const validatedData: UpdateCityData = matchedData(req);

	try {
		const city = await prisma.cities.update({
			where: {
				id: cityId,
			},
			data: req.body,
		});
		res.status(200).send(city);

	} catch (err) {
		debug("Error when trying to update City #%d: %O", cityId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

export const destroy = async (req: Request, res: Response) => {
	const cityId = Number(req.params.cityId);
	if (!cityId) {
		res.status(400).send({ message: "That is not a valid ID" });
		return;
	}

	try {
		await prisma.cities.delete({
			where: {
				id: cityId,
			}
		});
		res.status(204).send();

	} catch (err) {
		debug("Error when trying to delete City #%d: %O", cityId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}