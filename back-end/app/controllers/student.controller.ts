import { Request, Response } from 'express';

import { Config } from '@config/config';
import { studentSchema } from '@app/models';
import * as mongoose from 'mongoose';

export class StudentController {

	public login(req: Request, res: Response) {
		res.send('login');
	};

	public async insert(req: Request, res: Response) {
		const model = new studentSchema(req.body);
		const result = await model.save();
		res.send(result);
	};

	public async delete(req: Request, res: Response) {
		const result = await studentSchema.findByIdAndRemove(req.params.id).exec();
		res.send(true);
	};

	public async update(req: Request, res: Response) {
		const result = await studentSchema.findByIdAndUpdate(req.body._id, req.body).exec()
		res.send(result);
	};

	public async getAll(req: Request, res: Response) {
		const result = await studentSchema.find({}).exec();
		res.send(result);
	}

	public async getOne(req: Request, res: Response) {
		const result = await studentSchema
			.findById(req.params.id)
			.exec();

		res.send(result);
	}
}