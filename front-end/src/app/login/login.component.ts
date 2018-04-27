import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { LoginEntity } from '@app/entity/index';
import { StudentService } from '@app/service/student.service';
import { AutoFormService, AutoForm } from 'xcommon/autoform';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public ready = false;
	public id: string;
	public loginAutoForm: AutoForm<LoginEntity>;
	public loginForm: FormGroup;

	constructor(
		private studentService: StudentService,
		private autoForm: AutoFormService,
		private activatedRoute: ActivatedRoute,
		private router: Router) { }

	public ngOnInit() {
		this.buildForm();
	}

	public login(entity: LoginEntity): void {
		this.studentService.login(entity)
			.subscribe(res => {
				console.log(res);
			});
	}

	private buildForm(): void {
		this.loginAutoForm = this.autoForm.createNew<LoginEntity>();

		this.loginForm = this.loginAutoForm
			.addValidator(c => c.userName, Validators.required)
			.addValidator(c => c.password, Validators.required)
			.build({
				password: '',
				userName: ''
			});

		this.ready = true;
	}

}
