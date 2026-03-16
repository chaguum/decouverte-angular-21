import { Component } from '@angular/core';

interface SandboxProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
  wantsNewsletter: boolean;
}

@Component({
  selector: 'app-exercise-1-sandbox',
  standalone: false,
  templateUrl: './exercise-1-sandbox.html',
  styleUrl: './exercise-1-sandbox.css'
})
export class Exercise1Sandbox {
  protected readonly profile: SandboxProfile = {
    name: '',
    email: '',
    role: 'Developpeur Angular',
    bio: '',
    wantsNewsletter: false
  };

  protected readonly steps = [
    'Garder ce composant en standalone.',
    'Remplacer les champs HTML natifs par des composants standalone PrimeNG.',
    'Importer uniquement les composants PrimeNG necessaires dans imports.',
    'Conserver le meme comportement fonctionnel.'
  ] as const;
}
