package com.nisanth.springbootreact.controller;

import com.nisanth.springbootreact.model.Note;
import com.nisanth.springbootreact.model.Student;
import com.nisanth.springbootreact.repository.NoteRepository;
import com.nisanth.springbootreact.repository.StudentRepository;
import com.nisanth.springbootreact.service.IStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
//@CrossOrigin("http://localhost:3000")
//@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://frontend.example.com")
@CrossOrigin(origins = "http://app.sally.com")
public class StudentController {

    private final IStudentService studentService;
    private final StudentRepository studentRepository;
    private final NoteRepository noteRepository;

    @GetMapping
    public ResponseEntity<List<Student>> getStudents() {
        return new ResponseEntity<>(studentService.getStudents(), HttpStatus.FOUND);
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PutMapping("/update/{id}")
    public Student updateStudent(@RequestBody Student student, @PathVariable Long id) {
        return studentService.updateSTudent(student,id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return new ResponseEntity<>(studentService.getStudentById(id), HttpStatus.FOUND);
    }

    // Récupérer les notes d'un étudiant
    @GetMapping("/students/{id}/notes")
    public List<Note> getStudentNotes(@PathVariable Long id) {
        return noteRepository.findByStudentId(id);
    }

    // Ajouter une nouvelle note pour un étudiant
    @PostMapping("/students/{id}/notes")
    public ResponseEntity<Note> addStudentNote(@PathVariable Long id, @RequestBody Note note) {
        Student student = studentRepository.findById(id)
                .orElseThrow() ;
        note.setStudent(student);  // Associe l'étudiant à la note
        Note savedNote = noteRepository.save(note);
        return new ResponseEntity<>(savedNote, HttpStatus.CREATED);
    }
}
