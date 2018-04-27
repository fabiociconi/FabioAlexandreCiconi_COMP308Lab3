import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StudentEntity, LoginEntity } from '@app/entity/index';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

@Injectable()
export class StudentService {

	public userId: string;
	public logged = false;

	constructor(private http: HttpClient, private router: Router) { }

	public delete(id: string): Observable<boolean> {
		return this.http.delete<boolean>(`/api/student/${id}`);
	}

	public login(entity: LoginEntity): Observable<boolean> {
		if (entity.userName === '300906297' && entity.password === '123') {
			this.userId = entity.userName;
			this.logged = true;
			this.router.navigate(['/student']);
			return Observable.of(true);
		}

		this.userId = null;
		this.logged = false;
		return Observable.of(false);
	}

	public save(entity: StudentEntity): Observable<StudentEntity> {
		return entity._id
			? this.http.put<StudentEntity>('/api/student', entity)
			: this.http.post<StudentEntity>('/api/student', entity);
	}

	public get(id: string): Observable<StudentEntity>;
	public get(): Observable<StudentEntity[]>;
	public get(id?: string): Observable<StudentEntity | StudentEntity[]> {
		return id
			? this.http.get<StudentEntity>(`/api/student/${id}`)
			: this.http.get<StudentEntity[]>(`/api/student`);
	}
}
