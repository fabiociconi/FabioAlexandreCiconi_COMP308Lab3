import { Component, OnInit } from '@angular/core';
import { CourseService } from '@app/service/course.service';
import { CourseEntity } from '@app/entity/index';

@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

	public list: CourseEntity[] = [];

	constructor(private courseService: CourseService) { }

	ngOnInit() {
		this.courseService.get()
			.subscribe(res => this.list = res);
	}
}
