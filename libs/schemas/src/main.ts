import 'reflect-metadata';

// Schemas

// School Schema
export * from './School/school.schema';

// UF Schema
export * from './UF/uf.schema';


// Auth Schema
export * from './Auth/auth.schema';

// User Schema
export * from './User/base/base-user.schema';
export * from './User/base/user-role.schema';
export * from './User/user/user.schema';
export * from './User/admin/admin.schema';
export * from './User/student/student.schema';
export * from './User/teacher/teacher.schema';
export * from './User/base-user-discriminated.schema';
