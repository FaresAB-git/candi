package com.fares.candi_api.repository;

import com.fares.candi_api.model.Candidature;
import com.fares.candi_api.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {

    List<Candidature> findAllByUtilisateur(Utilisateur utilisateur);

    Optional<Candidature> findByIdAndUtilisateur(Long id,Utilisateur utilisateur);

    List<Candidature> findAllByIdInAndUtilisateur(List<Long> ids, Utilisateur utilisateur);


}
