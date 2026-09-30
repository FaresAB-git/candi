import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilisateurService } from '../../base/service/utilisateur.service';
import { StatutCandidature } from '../../base/mapping/candidature.mapping';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import {CandidatureService} from '../../base/service/candidature.service';
import {of, tap} from 'rxjs';
import {DatePipe} from '@angular/common';

interface StatutOption {
  value: StatutCandidature;
  label: string;
}

@Component({
  selector: 'app-candi-detail',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, InputComponent, ButtonComponent, DatePipe],
  templateUrl: './candi-detail.component.html',
  styleUrl: './candi-detail.component.css',
})
export class CandiDetailComponent {
  private candidatureService = inject(CandidatureService);
  private utilisateurService = inject(UtilisateurService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  candidatureId = signal<number | null>(
    this.route.snapshot.paramMap.get('id')
      ? Number(this.route.snapshot.paramMap.get('id'))
      : null
  );

  isEditMode = computed(() => this.candidatureId() !== null);

  statutOptions: StatutOption[] = [
    { value: StatutCandidature.ENVOYEE, label: 'Envoyée' },
    { value: StatutCandidature.RELANCE_EFFECTUEE, label: 'Relancée' },
    { value: StatutCandidature.ENTRETIEN_OBTENU, label: 'Entretien' },
    { value: StatutCandidature.OFFRE_RECUE, label: 'Offre reçue' },
    { value: StatutCandidature.REFUSEE, label: 'Refusée' },
  ];

  form = new FormGroup({
    entreprise: new FormControl('', [Validators.required]),
    poste: new FormControl('', [Validators.required]),
    lienOffre: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl<StatutCandidature>(StatutCandidature.A_PREPARER, [Validators.required]),
    dateCandidature: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
  });

  saving = signal(false);
  generatingCv = signal(false);
  errorMessage = signal<string | null>(null);

  candidatureResource = rxResource({
    request: () => this.candidatureId(),
    loader: ({ request }) => {
      if (request === null) {
        return of(null);
      }
      return this.candidatureService.getById(request).pipe(
        tap((data) => {
          this.form.patchValue({
            entreprise: data.entreprise,
            poste: data.poste,
            lienOffre: data.lienOffre ?? '',
            description: data.description ?? '',
            status: data.status,
            dateCandidature: data.dateCandidature,
            notes: data.notes ?? '',
          });
        })
      );
    },
  });

  utilisateurResource = rxResource({
    loader: () => this.utilisateurService.getMe(),
  });

  hasCvBase = computed(() => !!this.utilisateurResource.value()?.cvBaseUrl);
  cvGenereUrl = computed(() => this.candidatureResource.value()?.cvUrl ?? null);

  setStatut(value: StatutCandidature): void {
    this.form.controls.status.setValue(value);
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    const request = {
      entreprise: this.form.value.entreprise!,
      poste: this.form.value.poste!,
      lienOffre: this.form.value.lienOffre || null,
      description: this.form.value.description || null,
      status: this.form.value.status!,
      dateCandidature: this.form.value.dateCandidature!,
      notes: this.form.value.notes || null,
    };

    const id = this.candidatureId();
    const action = id
      ? this.candidatureService.update(id, request)
      : this.candidatureService.create(request);

    action.subscribe({
      next: (result) => {
        this.saving.set(false);
        if (!id) {
          // après création, on bascule vers l'URL d'édition pour permettre la génération de CV
          this.router.navigate(['/candidatures', result.id]);
        } else {
          this.candidatureResource.reload();
        }
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set("Erreur lors de l'enregistrement");
      },
    });
  }

  onDelete(): void {
    const id = this.candidatureId();
    if (!id) return;

    if (!confirm('Supprimer cette candidature ?')) return;

    this.candidatureService.delete(id).subscribe({
      next: () => this.router.navigate(['/candidatures']),
      error: () => this.errorMessage.set('Erreur lors de la suppression'),
    });
  }

  onCancel(): void {
    this.router.navigate(['/candidatures']);
  }

  onGenererCv(): void {
    const id = this.candidatureId();
    if (!id) return;

    this.generatingCv.set(true);
    this.candidatureService.genererCv(id).subscribe({
      next: () => {
        this.generatingCv.set(false);
        this.candidatureResource.reload();
      },
      error: () => {
        this.generatingCv.set(false);
        this.errorMessage.set('Erreur lors de la génération du CV');
      },
    });
  }
}
