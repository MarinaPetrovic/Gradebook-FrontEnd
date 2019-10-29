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
export const GET_ALL_STUDENTS = `${url}`;
export const GET_ALL_STUDENTS_GRADES = `${url}`;