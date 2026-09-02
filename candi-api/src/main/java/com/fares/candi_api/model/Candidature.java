package com.fares.candi_api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "candidature")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateur utilisateur;

    @Column(nullable = false)
    private String entreprise;

    @Column(nullable = false)
    private String poste;

    @Column(name = "description_offre", columnDefinition = "TEXT")
    private String descriptionOffre;

    @Column(name = "lien_offre")
    private String lienOffre;

    @Column(name = "date_candidature")
    private LocalDate dateCandidature;

    @Enumerated(EnumType.STRING)
    private StatutCandidature statut;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "cv_url")
    private String cvUrl;

    @Column(name = "lettre_url")
    private String lettreUrl;

    @Column(name = "date_creation", updatable = false)
    private LocalDateTime dateCreation;

    @Column(name = "date_maj")
    private LocalDateTime dateMaj;

    @PrePersist
    protected void onCreate() {
        dateCreation = LocalDateTime.now();
        dateMaj = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        dateMaj = LocalDateTime.now();
    }
}