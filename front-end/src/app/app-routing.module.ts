import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from '@app/student/student-list.component';
import { StudentEditComponent } from '@app/student/student-edit.component';
import { CourseListComponent } from '@app/course/course-list.component';
import { CourseEditComponent } from '@app/course/course-edit.component';
import { LoginComponent } from '@app/login/login.component';
import { UsersGuard } from '@app/guards/users.guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'student', canActivate: [UsersGuard], component: StudentListComponent },
	{ path: 'student/:id', canActivate: [UsersGuard], component: StudentEditComponent },
	{ path: 'course', canActivate: [UsersGuard], component: CourseListComponent },
	{ path: 'course/:id', canActivate: [UsersGuard], component: CourseEditComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
