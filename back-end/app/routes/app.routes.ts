import * as express from 'express';
import { StudentController } from '@app/controllers/student.controller';
import { CourseController } from '@app/controllers/course.controller';

export const appRoutes = (app: express.Application): void => {
	const student = new StudentController();
	const course = new CourseController();

	app.post('/api/login', student.login);

	app.get('/api/student', student.getAll);
	app.get('/api/student/:id', student.getOne);
    app.post('/api/student', student.insert);
    app.put('/api/student', student.update);
    app.delete('/api/student/:id', student.delete);

    app.get('/api/course', course.getAll);
	app.get('/api/course/:id', course.getOne);
    app.post('/api/course', course.insert);
    app.put('/api/course', course.update);
    app.delete('/api/course/:id', course.delete);
}