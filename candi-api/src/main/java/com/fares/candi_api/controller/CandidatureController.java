package com.fares.candi_api.controller;

import com.fares.candi_api.dto.CandidatureRequest;
import com.fares.candi_api.dto.CandidatureResponse;
import com.fares.candi_api.dto.DeleteBatchRequestDto;
import com.fares.candi_api.model.Candidature;
import com.fares.candi_api.model.StatutCandidature;
import com.fares.candi_api.service.CandidatureService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/candidature")
public class CandidatureController {

    private final CandidatureService candidatureService;

    public CandidatureController(CandidatureService candidatureService) {
        this.candidatureService = candidatureService;
    }

    @PostMapping
    public ResponseEntity<CandidatureResponse> createCandidature(@RequestBody @Valid CandidatureRequest candidatureRequest, Authentication authentication){
        String email = authentication.getName();
        return ResponseEntity.ok(candidatureService.createCandidature(candidatureRequest, email));
    }

    @GetMapping
    public ResponseEntity<List<CandidatureResponse>> getCandidatures(Authentication authentication){
        String email = authentication.getName();
        return ResponseEntity.ok(candidatureService.getCandidatures(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidatureResponse> getCandidature(@PathVariable Long id, Authentication authentication){
        String email = authentication.getName();
        return ResponseEntity.ok(candidatureService.getCandidature(email, id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CandidatureResponse> updateCandidature(@PathVariable Long id,@RequestBody @Valid CandidatureRequest candidatureRequest,Authentication authentication){
        String email = authentication.getName();
        return ResponseEntity.ok(candidatureService.update(id, candidatureRequest, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidature(@PathVariable Long id, Authentication authentication){
        String email = authentication.getName();
        candidatureService.deleteCandidature(email, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/batch")
    public ResponseEntity<Void> deleteBatchCandidature(@RequestBody DeleteBatchRequestDto deleteBatchRequestDto, Authentication authentication){
        String email = authentication.getName();
        candidatureService.deleteBatch(email, deleteBatchRequestDto.ids());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/api/statuts")
    public ResponseEntity<StatutCandidature[]> getStatuts() {
        return ResponseEntity.ok(StatutCandidature.values());
    }

    @PostMapping("/{id}/cv")
    public ResponseEntity<CandidatureResponse> uploadCv(@PathVariable Long id, @RequestParam("file") MultipartFile file, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(candidatureService.uploadCv(id, email, file));
    }

    @DeleteMapping("/{id}/cv")
    public ResponseEntity<CandidatureResponse> deleteCv(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(candidatureService.deleteCv(id, email));
    }

    @PostMapping("/{id}/lettre")
    public ResponseEntity<CandidatureResponse> uploadLettre(@PathVariable Long id, @RequestParam("file") MultipartFile file, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(candidatureService.uploadLettre(id, email, file));
    }

    @DeleteMapping("/{id}/lettre")
    public ResponseEntity<CandidatureResponse> deleteLettre(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(candidatureService.deleteLettre(id, email));
    }

}
