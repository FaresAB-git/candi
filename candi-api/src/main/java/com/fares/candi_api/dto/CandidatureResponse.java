package com.fares.candi_api.dto;


import com.fares.candi_api.model.StatutCandidature;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record CandidatureResponse(
        Long id,
        String entreprise,
        String poste,
        String description,
        String lienOffre,
        LocalDate dateCandidature,
        StatutCandidature status,
        String notes,
        String cvUrl,
        String lettreUrl,
        LocalDateTime dateCreation,
        LocalDateTime dateModification
) {}