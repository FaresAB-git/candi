package com.fares.candi_api.controller;

import com.fares.candi_api.dto.UtilisateurResponseDto;
import com.fares.candi_api.model.Utilisateur;
import com.fares.candi_api.repository.UtilisateurRepository;
import com.fares.candi_api.service.UtilisateurService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
public class UtilisateurController {

    private final UtilisateurRepository utilisateurRepository;
    private final UtilisateurService utilisateurService;

    public UtilisateurController(UtilisateurRepository utilisateurRepository, UtilisateurService utilisateurService) {
        this.utilisateurRepository = utilisateurRepository;
        this.utilisateurService = utilisateurService;
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

    @PostMapping("/me/cv-base")
    public ResponseEntity<UtilisateurResponseDto> uploadCvBase(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        String email = authentication.getName();
        return ResponseEntity.ok(utilisateurService.uploadBaseCv(email, file));
    }

    @DeleteMapping("/me/cv-base")
    public ResponseEntity<UtilisateurResponseDto> deleteCvBase(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(utilisateurService.deleteCvBase(email));
    }
}