const url = "https://cv-egradebook-testone.azurewebsites.net/";

export const LOGIN = `${url}token`;
export const GET_USER_DATA = `${url}api/accounts/whoami`; 
export const GET_ADMIN_DATA = `${url}api/admins?adminId=`;
export const GET_TEACHER_DATA = `${url}api/teachers?techerId=`;
export const GET_STUDENT_DATA = `${url}api/students?studentId=`;
export const GET_PARENT_DATA = `${url}api/parents?parentId=`;
export const CREATE_ADMIN_USER = `${url}api/accounts/register-admin`;
export const CREATE_TEACHER_USER = `${url}api/accounts/register-teacher`;
export const CREATE_STUDENT_USER = `${url}api/accounts/register-student`;
export const CREATE_PARENT_USER = `${url}api/accounts/register-parent`;
export const GET_ALL_STUDENTS = `${url}api/students`;
export const GET_ALL_STUDENTS_GRADES = (studentId) => `${url}api/students/${studentId}/report`;
export const GET_ALL_ADMINS = `${url}api/admins`;
export const GET_ALL_TEACHERS = `${url}api/teachers`;
export const GET_ALL_PARENTS = `${url}api/parents`;
export const GET_STUDENT_GRADES = `${url}api/students/query?parentId=`;
export const GET_TEACHERS_REPORT = (teacherId) => `${url}/api/teachers/${teacherId}/report`;
export const UPDATE_ADMIN_USER = `${url}api/accounts/update-admin/`;
export const UPDATE_PARENT_USER = `${url}api/accounts/update-parent/`;
export const UPDATE_STUDENT_USER = `${url}api/accounts/update-student/`;
export const UPDATE_TEACHER_USER = `${url}api/accounts/update-teacher/`;
export const GET_PARENT_USER_DATA = `${url}api/parents/`;
export const GET_ALL_COURSES = `${url}api/teachings`;
export const CREATE_NEW_COURSE = `${url}api/teachings`;
export const GET_ALL_CLASSROOMS = `${url}api/classrooms`;
export const GET_GRADES_FOR_STUDENT = `${url}api/grades/api/grades/forpublic`;
export const ENROLL_STUDENT = (classRoomId) => `${url}api/classrooms/${classRoomId}/enrollments`;

export const DELETE_ADMIN_USER = `${url}api/admins/`;
export const DELETE_PARENT_USER = `${url}api/parents/`;
export const DELETE_STUDENT_USER = `${url}api/students/`;
export const DELETE_TEAHER_USER = `${url}api/teachers/`;

export const CREATE_NEW_CLASSROOM = `${url}api/classrooms`;
export const CREATE_NEW_SUBJECT = `${url}`;
export const ADD_NEW_MARK = `${url}api/grades/for-teachers/`;