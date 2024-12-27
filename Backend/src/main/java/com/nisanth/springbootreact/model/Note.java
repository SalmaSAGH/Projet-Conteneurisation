package com.nisanth.springbootreact.model;




import jakarta.persistence.*;



@Entity
@Table(name="notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseName;
    private Float noteValue;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;  // Relation avec l'étudiant

    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Float getNoteValue() {
        return noteValue;
    }

    public void setNoteValue(Float noteValue) {
        this.noteValue = noteValue;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}
