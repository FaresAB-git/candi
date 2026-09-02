package com.fares.candi_api.repository;

import com.fares.candi_api.model.Candidature;
import com.fares.candi_api.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {

    List<Candidature> findAllByUtilisateur(Utilisateur utilisateur);
}
