package com.fares.candi_api.dto;

import com.fares.candi_api.model.StatutCandidature;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CandidatureRequest(
        @NotBlank String entreprise,
        @NotBlank String poste,
        String description,
        String lienOffre,
        @NotNull StatutCandidature status,
        @NotNull LocalDate dateCandidature,
        String notes
) {}