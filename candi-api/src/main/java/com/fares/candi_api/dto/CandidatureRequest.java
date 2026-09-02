package com.fares.candi_api.dto;

import com.fares.candi_api.model.StatutCandidature;

public record CandidatureRequest(String entreprise, String poste, String description, String lienOffre, StatutCandidature status) {
}
