
export enum StatutCandidature {
  A_PREPARER = 'A_PREPARER',
  ENVOYEE = 'ENVOYEE',
  RELANCE_EFFECTUEE = 'RELANCE_EFFECTUEE',
  ENTRETIEN_OBTENU = 'ENTRETIEN_OBTENU',
  REFUSEE = 'REFUSEE',
  OFFRE_RECUE = 'OFFRE_RECUE',
  ABANDONNEE = 'ABANDONNEE',
}


export interface CandidatureResponse {
  entreprise: string;
  poste: string;
  description: string | null;
  lienOffre: string | null;
  status: StatutCandidature;
  dateCandidature: string;
  notes: string | null;
}

export interface CandidatureRequest {
  id: number;
  entreprise: string;
  poste: string;
  description: string | null;
  lienOffre: string | null;
  dateCandidature: string;
  status: StatutCandidature;
  notes: string | null;
  cvUrl: string | null;
  lettreUrl: string | null;
  dateCreation: string;
  dateModification: string;
}
