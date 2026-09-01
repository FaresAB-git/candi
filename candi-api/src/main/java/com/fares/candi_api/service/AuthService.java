package com.fares.candi_api.service;

import com.fares.candi_api.dto.AuthResponseDto;
import com.fares.candi_api.dto.LoginRequestDto;
import com.fares.candi_api.dto.RegisterRequestDto;
import com.fares.candi_api.model.Utilisateur;
import com.fares.candi_api.repository.UtilisateurRepository;
import com.fares.candi_api.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UtilisateurRepository utilisateurRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponseDto register(RegisterRequestDto request){
        if(utilisateurRepository.existsByEmail(request.email())){
            throw new IllegalArgumentException("Cet email est déjà utilisé");
        }
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail(request.email());
        utilisateur.setMotDePasse(passwordEncoder.encode(request.motDePasse()));
        utilisateurRepository.save(utilisateur);

        return new AuthResponseDto(jwtService.generateToken(request.email()));
    }

    public AuthResponseDto login(LoginRequestDto request) {
        // Déclenche la vérification email/mot de passe via UserDetailsServiceImpl + PasswordEncoder
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.motDePasse())
        );

        String token = jwtService.generateToken(request.email());
        return new AuthResponseDto(token);
    }
}
