package com.fares.candi_api.dto;


import com.fares.candi_api.model.StatutCandidature;

import java.time.LocalDateTime;

public record CandidatureResponse(
        Long id,
        String entreprise,
        String poste,
        String description,
        String lienOffre,
        StatutCandidature status,
        LocalDateTime dateCreation,
        LocalDateTime dateModification
) {}