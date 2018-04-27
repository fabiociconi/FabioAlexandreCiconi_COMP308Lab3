import * as mongoose from 'mongoose';

const student = new mongoose.Schema(
	{
		studentNumber: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		city: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		email: { type: String, required: true },
		address: { type: String, required: true },
		courses: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'course'
		}]
	});

const course = new mongoose.Schema(
	{
		courseCode: { type: String, required: true },
		courseName: { type: String, required: true },
		section: { type: String, required: true },
		semester: { type: Number, required: true, default: 1 }
	});

export const studentSchema = mongoose.model('student', student);;
export const courseSchema = mongoose.model('course', course);;