package com.fares.candi_api.controller;

import com.fares.candi_api.dto.UtilisateurResponseDto;
import com.fares.candi_api.model.Utilisateur;
import com.fares.candi_api.repository.UtilisateurRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UtilisateurController {

    private final UtilisateurRepository utilisateurRepository;

    public UtilisateurController(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<UtilisateurResponseDto> me(Authentication authentication) {
        String email = authentication.getName(); // récupéré depuis le JWT via le filtre
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        return ResponseEntity.ok(new UtilisateurResponseDto(
                utilisateur.getId(),
                utilisateur.getEmail(),
                utilisateur.getCvBaseUrl(),
                utilisateur.getLettreBaseUrl()
        ));
    }
}