import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { XCommonAutoFormModule } from 'xcommon/autoform';

import { MaterialModule } from '@app/material.module';
import { AppRoutingModule } from '@app/app-routing.module';

import { StudentListComponent } from '@app/student/student-list.component';
import { StudentEditComponent } from '@app/student/student-edit.component';
import { AppComponent } from '@app/app.component';
import { LoginComponent } from '@app/login/login.component';
import { CourseEditComponent } from '@app/course/course-edit.component';
import { CourseListComponent } from '@app/course/course-list.component';
import { CourseService } from '@app/service/course.service';
import { StudentService } from '@app/service/student.service';
import { UsersGuard } from './guards/users.guard';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		StudentListComponent,
		StudentEditComponent,
		CourseEditComponent,
		CourseListComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		XCommonAutoFormModule,
		MaterialModule,
		AppRoutingModule
	],
	providers: [CourseService, StudentService, UsersGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }
