import {Component, computed, effect, inject} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {CandidatureService} from '../../base/service/candidature.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-candidature',
  imports: [],
  templateUrl: './candidature.component.html',
  styleUrl: './candidature.component.css'
})
export class CandidatureComponent {

  candidatureService = inject(CandidatureService)


  candiRessource = rxResource({
    loader: () => this.candidatureService.getCandidatures()
  });

  candidatures = computed(() => this.candiRessource.value());

  constructor() {
    effect(() => {
      const candiLoaded = this.candiRessource.hasValue();
      if (candiLoaded) {
        console.log('candidature loaded');
        console.log(this.candidatures());
      }
    });
  }


}
