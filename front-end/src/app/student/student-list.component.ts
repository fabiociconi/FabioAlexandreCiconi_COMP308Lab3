import { Component, OnInit } from '@angular/core';
import { StudentService } from '@app/service/student.service';
import { StudentEntity } from '@app/entity/index';

@Component({
	selector: 'app-student-list',
	templateUrl: './student-list.component.html',
	styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

	public list: StudentEntity[] = [];

	constructor(private studentService: StudentService) { }

	ngOnInit() {
		this.studentService.get()
			.subscribe(res => this.list = res);
	}
}
