package com.nisanth.springbootreact.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    private Double average;  // Champ pour la moyenne

    @Column(updatable = false) // Ne sera pas mis à jour après la création
    private LocalDateTime createdAt;  // Champ pour la date de création

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now(); // Définir la date de création au moment de l'ajout
    }
}
