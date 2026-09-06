package com.fares.candi_api.dto;

import com.fares.candi_api.model.StatutCandidature;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record CandidatureRequest(@NotBlank String entreprise,
                                 @NotBlank String poste,
                                 String description,
                                 String lienOffre,
                                 @NotBlank StatutCandidature status,
                                 LocalDate DateCandidature
) {}
