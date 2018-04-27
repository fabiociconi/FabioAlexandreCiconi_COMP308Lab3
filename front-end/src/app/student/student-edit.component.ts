import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StudentEntity, CourseEntity } from '@app/entity/index';
import { StudentService } from '@app/service/student.service';
import { CourseService } from '@app/service/course.service';
import { AutoFormService, AutoForm } from 'xcommon/autoform';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material';

class Checked<T> {
	checked: boolean;
	item: T;

	public static create<T>(list: T[], checked?: (T) => boolean): Checked<T>[] {
		const result: Checked<T>[] = [];

		list.forEach(item => {
			result.push({ checked: checked(item) || false, item: item });
		});

		return result;
	}
}

@Component({
	selector: 'app-student-edit',
	templateUrl: './student-edit.component.html',
	styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

	private studentCourses: string[] = [];
	public courses: Checked<CourseEntity>[] = [];
	public ready = false;
	public id: string;
	public studentAutoForm: AutoForm<StudentEntity>;
	public studentForm: FormGroup;

	constructor(
		private studentService: StudentService,
		private courseService: CourseService,
		private autoForm: AutoFormService,
		private activatedRoute: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(param => {
			this.load(param.id);
		});

		this.courseService.get()
			.subscribe(res => {
				this.courses = Checked.create(res, (item: CourseEntity) => {
					return this.studentCourses.filter(c => c === item._id).length !== 0;
				});
			});
	}

	public save(entity: StudentEntity): void {
		entity.courses = this.studentCourses;

		this.studentService.save(entity)
			.subscribe(res => {
				console.log(res);
			});
	}

	public delete(): void {
		this.studentService.delete(this.id)
			.subscribe(res => {
				this.router.navigate(['/student']);
			});
	}

	private load(id: string): void {
		this.id = id;

		if (id !== 'new') {
			this.studentService.get(id).subscribe(res => {
				this.buildForm(res);
			});

			return;
		}

		this.buildForm({
			address: '',
			studentNumber: '',
			firstName: '',
			lastName: '',
			city: '',
			phoneNumber: '',
			email: '',
			courses: []
		});
	}

	public courseChange($event: MatCheckboxChange, id: string) {
		this.studentCourses = this.studentCourses.filter(c => c !== id);

		if ($event.checked) {
			this.studentCourses.push(id);
		}
	}

	private buildForm(entity: StudentEntity): void {
		this.studentAutoForm = this.autoForm.createNew<StudentEntity>();

		this.studentForm = this.studentAutoForm
			.addValidator(c => c.address, Validators.required)
			.addValidator(c => c.studentNumber, Validators.required)
			.addValidator(c => c.firstName, Validators.required)
			.addValidator(c => c.lastName, Validators.required)
			.addValidator(c => c.city, Validators.required)
			.addValidator(c => c.phoneNumber, Validators.required)
			.addValidator(c => c.email, Validators.required)
			.build(entity);

		this.studentCourses = entity.courses;
		this.ready = true;
	}
}
