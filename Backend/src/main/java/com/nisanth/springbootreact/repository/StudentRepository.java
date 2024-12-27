package com.nisanth.springbootreact.repository;

import com.nisanth.springbootreact.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student,Long> {
    Optional<Student> findByFirstName(String firstName);
}
