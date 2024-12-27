package com.nisanth.springbootreact.controller;



import com.nisanth.springbootreact.model.Note;
import com.nisanth.springbootreact.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
//@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://frontend.example.com")
@CrossOrigin(origins = "http://app.sally.com")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    // Récupérer les notes d'un étudiant
    @GetMapping("/students/{studentId}")
    public List<Note> getNotesByStudent(@PathVariable Long studentId) {
        return noteRepository.findByStudentId(studentId);
    }

    // Ajouter une nouvelle note
    @PostMapping("/add")
    public Note addNote(@RequestBody Note note) {
        return noteRepository.save(note);
    }
}

