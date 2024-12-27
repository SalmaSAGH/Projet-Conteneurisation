package com.nisanth.springbootreact.repository;
import java.util.List;

import com.nisanth.springbootreact.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire, par exemple pour récupérer les notes d'un étudiant
    List<Note> findByStudentId(Long studentId);
}
