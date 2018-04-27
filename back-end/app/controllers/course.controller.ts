import { Request, Response } from 'express';

import { Config } from '@config/config';
import { courseSchema, studentSchema } from '@app/models';
import * as mongoose from 'mongoose';
import { CourseEntity, StudentEntity } from '../../../entity';

export class CourseController {

	public async insert(req: Request, res: Response) {
		const model = new courseSchema(req.body);
		const result = await model.save();
		res.send(result);
	};

	public async delete(req: Request, res: Response) {
		const result = await courseSchema.findByIdAndRemove(req.params.id).exec();
		res.send(true);
	};

	public async update(req: Request, res: Response) {
		const result = await courseSchema.findByIdAndUpdate(req.body._id, req.body).exec()
		res.send(result);
	};

	public async getAll(req: Request, res: Response) {
		const result = await courseSchema.find({}).exec();
		res.send(result);
	}

	public async getOne(req: Request, res: Response) {
		const course = await courseSchema.findById(req.params.id).exec();
		const students = await studentSchema.find({ courses: course._id }, { courses: 0 }).exec();

		res.send({course, students});
	}
}