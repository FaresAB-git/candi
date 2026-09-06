package com.fares.candi_api.service;

import com.fares.candi_api.dto.UtilisateurResponseDto;
import com.fares.candi_api.model.Utilisateur;
import com.fares.candi_api.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UtilisateurService {

    private final StorageService storageService;
    private final UtilisateurRepository utilisateurRepository;

    public UtilisateurService(StorageService storageService, UtilisateurRepository utilisateurRepository) {
        this.storageService = storageService;
        this.utilisateurRepository = utilisateurRepository;
    }

    public UtilisateurResponseDto uploadBaseCv(String email, MultipartFile file){
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé "));

        if (utilisateur.getCvBaseUrl() != null){
            storageService.delete(utilisateur.getCvBaseUrl());
        }

        String url = storageService.upload(file);

        utilisateur.setCvBaseUrl(url);

        return this.mapToDto(utilisateur);
    }

    public UtilisateurResponseDto deleteCvBase(String email) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (utilisateur.getCvBaseUrl() != null) {
            storageService.delete(utilisateur.getCvBaseUrl());
            utilisateur.setCvBaseUrl(null);
            utilisateurRepository.save(utilisateur);
        }

        return mapToDto(utilisateur);
    }


    private UtilisateurResponseDto mapToDto(Utilisateur utilisateur) {
        return new UtilisateurResponseDto(
                utilisateur.getId(),
                utilisateur.getEmail(),
                utilisateur.getCvBaseUrl(),
                utilisateur.getLettreBaseUrl()
        );
    }
}
