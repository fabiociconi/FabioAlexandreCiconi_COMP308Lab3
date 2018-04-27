export class StudentEntity {
    _id?: string;
    studentNumber: string;
    firstName: string;
    lastName: string;
    city: string;
    phoneNumber: string;
    email: string;
    address: string;
    courses: string[];
}

export class LoginEntity {
    userName: string;
    password: string;
}

export class CourseEntity {
    _id?: string;
    courseCode: string;
    courseName: string;
    section: string;
    semester: number;
}

export class Course {
    course: CourseEntity;
    students: StudentEntity[];
}