package com.fares.candi_api.service;

import com.fares.candi_api.dto.CandidatureRequest;
import com.fares.candi_api.dto.CandidatureResponse;
import com.fares.candi_api.model.Candidature;
import com.fares.candi_api.model.Utilisateur;
import com.fares.candi_api.repository.CandidatureRepository;
import com.fares.candi_api.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CandidatureService {

    private final CandidatureRepository candidatureRepository;
    private final UtilisateurRepository utilisateurRepository;

    public CandidatureService(CandidatureRepository candidatureRepository, UtilisateurRepository utilisateurRepository) {
        this.candidatureRepository = candidatureRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    public CandidatureResponse createCandidature(CandidatureRequest candi, String email){
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email).
                orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Candidature candidature = new Candidature();
        candidature.setDateCreation(LocalDateTime.now());
        candidature.setDateCandidature(candi.DateCandidature());
        candidature.setEntreprise(candi.entreprise());
        candidature.setDescriptionOffre(candi.description());
        candidature.setLienOffre(candi.lienOffre());
        candidature.setPoste(candi.poste());
        candidature.setStatut(candi.status());
        candidature.setUtilisateur(utilisateur);

        Candidature createdCandi = candidatureRepository.save(candidature);

        return this.mapToDto(createdCandi);

    }

    public List<CandidatureResponse> getCandidatures(String email){
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email).
                orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        List<Candidature> candidatures = candidatureRepository.findAllByUtilisateur(utilisateur);
        return candidatures.stream().map(this::mapToDto).toList();
    }

    public CandidatureResponse getCandidature(String email, Long id){
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email).
                orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Candidature candidature = candidatureRepository.findByIdAndUtilisateur(id, utilisateur)
                .orElseThrow(() -> new RuntimeException("Candidature non trouvée"));

        return this.mapToDto(candidature);
    }

    public CandidatureResponse update(Long id, CandidatureRequest candi, String email) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Candidature candidature = candidatureRepository.findByIdAndUtilisateur(id, utilisateur)
                .orElseThrow(() -> new RuntimeException("Candidature non trouvée"));

        Candidature updatedCandidature = new Candidature();
        candidature.setDateMaj(LocalDateTime.now());
        candidature.setDateCandidature(candi.DateCandidature());
        candidature.setEntreprise(candi.entreprise());
        candidature.setDescriptionOffre(candi.description());
        candidature.setLienOffre(candi.lienOffre());
        candidature.setPoste(candi.poste());
        candidature.setStatut(candi.status());

        Candidature updated = candidatureRepository.save(candidature);
        return mapToDto(updated);
    }

    public void deleteCandidature(String email, Long id){
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email).
                orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Candidature candidature = candidatureRepository.findByIdAndUtilisateur(id, utilisateur)
                .orElseThrow(() -> new RuntimeException("Candidature non trouvée"));

        candidatureRepository.deleteById(id);
    }

    public void deleteBatch(String email, List<Long> ids){
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email).
                orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        List<Candidature> candidatures = candidatureRepository.findAllByIdInAndUtilisateur(ids, utilisateur);

        if (candidatures.size() != ids.size()) {
            throw new RuntimeException("Une ou plusieurs candidatures n'existent pas ou ne vous appartiennent pas");
        }

        candidatureRepository.deleteAll(candidatures);
    }

    private CandidatureResponse mapToDto(Candidature candidature) {
        return new CandidatureResponse(
                candidature.getId(),
                candidature.getEntreprise(),
                candidature.getPoste(),
                candidature.getDescriptionOffre(),
                candidature.getLienOffre(),
                candidature.getStatut(),
                candidature.getDateCreation(),
                candidature.getDateMaj()
        );
    }
}
