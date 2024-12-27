package com.nisanth.springbootreact.service;

import com.nisanth.springbootreact.model.Student;

import java.util.List;

public interface IStudentService
{
    Student addStudent(Student student);
    List<Student> getStudents();
    Student updateSTudent(Student student,Long id);
    Student getStudentById(Long id);
    void deleteStudent(Long id);
}
