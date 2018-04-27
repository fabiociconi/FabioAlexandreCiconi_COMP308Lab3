import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StudentService } from '@app/service/student.service';

@Injectable()
export class UsersGuard implements CanActivate {

	constructor(private studentService: StudentService, private router: Router) {
	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (this.studentService.logged === true) {
			return true;
		}

		this.router.navigate(['/login']);
		return false;
	}
}
