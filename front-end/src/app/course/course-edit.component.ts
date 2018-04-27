import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CourseEntity, StudentEntity } from '@app/entity/index';
import { CourseService } from '@app/service/course.service';
import { AutoFormService, AutoForm } from 'xcommon/autoform';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-course-edit',
	templateUrl: './course-edit.component.html',
	styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

	public ready = false;
	public id: string;
	public courseAutoForm: AutoForm<CourseEntity>;
	public courseForm: FormGroup;
	public students: StudentEntity[] = [];

	constructor(
		private courseService: CourseService,
		private autoForm: AutoFormService,
		private activatedRoute: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(param => {
			this.load(param.id);
		});
	}

	public save(entity: CourseEntity): void {
		this.courseService.save(entity)
			.subscribe(res => {
				console.log(res);
			});
	}

	public delete(): void {
		this.courseService.delete(this.id)
			.subscribe(res => {
				this.router.navigate(['/course']);
			});
	}

	private load(id: string): void {
		this.id = id;

		if (id !== 'new') {
			this.courseService.get(id).subscribe(res => {
				this.buildForm(res.course);
				this.students = res.students;
			});

			return;
		}

		this.buildForm({
			courseCode: '',
			courseName: '',
			section: '',
			semester: 1
		});
	}

	private buildForm(entity: CourseEntity): void {
		this.courseAutoForm = this.autoForm.createNew<CourseEntity>();

		this.courseForm = this.courseAutoForm
			.addValidator(c => c.courseCode, Validators.required)
			.addValidator(c => c.courseName, Validators.required)
			.addValidator(c => c.section, Validators.required)
			.addValidator(c => c.semester, Validators.required)
			.addValidator(c => c.semester, Validators.min(1))
			.addValidator(c => c.semester, Validators.max(6))
			.build(entity);

		this.ready = true;
	}

}
