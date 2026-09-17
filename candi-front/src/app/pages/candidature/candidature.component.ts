import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { CandidatureService } from '../../base/service/candidature.service';
import { UtilisateurService } from '../../base/service/utilisateur.service';
import { StatutCandidature } from '../../base/mapping/candidature.mapping';
import { ButtonComponent } from '../../components/button/button.component';

interface StatutFilter {
  value: StatutCandidature | 'TOUTES';
  label: string;
}

@Component({
  selector: 'app-candidature',
  standalone: true,
  imports: [DatePipe, ButtonComponent],
  templateUrl: './candidature.component.html',
  styleUrl: './candidature.component.css'
})
export class CandidatureComponent {
  candidatureService = inject(CandidatureService);
  userService = inject(UtilisateurService);

  candiRessource = rxResource({
    loader: () => this.candidatureService.getCandidatures()
  });

  candidatures = computed(() => this.candiRessource.value() ?? []);

  searchTerm = signal('');
  activeFilter = signal<StatutCandidature | 'TOUTES'>('TOUTES');

  statutLabels: Record<StatutCandidature, string> = {
    [StatutCandidature.A_PREPARER]: 'À préparer',
    [StatutCandidature.ENVOYEE]: 'Envoyée',
    [StatutCandidature.RELANCE_EFFECTUEE]: 'Relancée',
    [StatutCandidature.ENTRETIEN_OBTENU]: 'Entretien',
    [StatutCandidature.REFUSEE]: 'Refusée',
    [StatutCandidature.OFFRE_RECUE]: 'Offre reçue',
    [StatutCandidature.ABANDONNEE]: 'Abandonnée',
  };

  statutClasses: Record<StatutCandidature, string> = {
    [StatutCandidature.A_PREPARER]: 'statut-neutre',
    [StatutCandidature.ENVOYEE]: 'statut-neutre',
    [StatutCandidature.RELANCE_EFFECTUEE]: 'statut-relancee',
    [StatutCandidature.ENTRETIEN_OBTENU]: 'statut-entretien',
    [StatutCandidature.REFUSEE]: 'statut-refusee',
    [StatutCandidature.OFFRE_RECUE]: 'statut-entretien',
    [StatutCandidature.ABANDONNEE]: 'statut-neutre',
  };

  counts = computed(() => {
    const list = this.candidatures();
    const result: Record<string, number> = { TOUTES: list.length };
    for (const c of list) {
      result[c.status] = (result[c.status] ?? 0) + 1;
    }
    return result;
  });

  filters = computed<StatutFilter[]>(() => [
    { value: 'TOUTES', label: `Toutes · ${this.counts()['TOUTES'] ?? 0}` },
    { value: StatutCandidature.ENVOYEE, label: `Envoyée · ${this.counts()[StatutCandidature.ENVOYEE] ?? 0}` },
    { value: StatutCandidature.RELANCE_EFFECTUEE, label: `Relancée · ${this.counts()[StatutCandidature.RELANCE_EFFECTUEE] ?? 0}` },
    { value: StatutCandidature.ENTRETIEN_OBTENU, label: `Entretien · ${this.counts()[StatutCandidature.ENTRETIEN_OBTENU] ?? 0}` },
    { value: StatutCandidature.REFUSEE, label: `Refusée · ${this.counts()[StatutCandidature.REFUSEE] ?? 0}` },
  ]);

  filteredCandidatures = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const filter = this.activeFilter();

    return this.candidatures().filter(c => {
      const matchStatut = filter === 'TOUTES' || c.status === filter;
      const matchSearch = !term || c.entreprise.toLowerCase().includes(term);
      return matchStatut && matchSearch;
    });
  });

  entretiensEnCours = computed(() =>
    this.candidatures().filter(c => c.status === StatutCandidature.ENTRETIEN_OBTENU).length
  );

  onSearchChange(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  setFilter(value: StatutCandidature | 'TOUTES'): void {
    this.activeFilter.set(value);
  }

  getInitial(entreprise: string): string {
    return entreprise.charAt(0).toUpperCase();
  }
}
