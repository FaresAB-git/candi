package com.fares.candi_api.controller;

import com.fares.candi_api.dto.CandidatureRequest;
import com.fares.candi_api.dto.CandidatureResponse;
import com.fares.candi_api.service.CandidatureService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/api/candidature")
public class CandidatureController {

    private final CandidatureService candidatureService;

    public CandidatureController(CandidatureService candidatureService) {
        this.candidatureService = candidatureService;
    }

    @PostMapping()
    public ResponseEntity<CandidatureResponse> createCandidature(@RequestBody CandidatureRequest candidatureRequest
    , Authentication authentication){
        String email = authentication.getName();
        return ResponseEntity.ok(candidatureService.createCandidature(candidatureRequest, email));
    }

    @GetMapping()
    public ResponseEntity<List<CandidatureResponse>> getCandidatures(Authentication authentication){
        String email = authentication.getName();
        return ResponseEntity.ok(candidatureService.getCandidature(email));
    }



}
