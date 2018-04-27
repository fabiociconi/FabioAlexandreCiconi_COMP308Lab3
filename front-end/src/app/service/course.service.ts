import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseEntity, Course } from '@app/entity/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CourseService {

	constructor(private http: HttpClient) { }

	public delete(id: string): Observable<boolean> {
		return this.http.delete<boolean>(`/api/course/${id}`);
	}

	public save(entity: CourseEntity): Observable<CourseEntity> {
		return entity._id
			? this.http.put<CourseEntity>('/api/course', entity)
			: this.http.post<CourseEntity>('/api/course', entity);
	}

	public get(id: string): Observable<Course>;
	public get(): Observable<CourseEntity[]>;
	public get(id?: string): Observable<Course | CourseEntity[]> {
		return id
			? this.http.get<Course>(`/api/course/${id}`)
			: this.http.get<CourseEntity[]>(`/api/course`);
	}
}
