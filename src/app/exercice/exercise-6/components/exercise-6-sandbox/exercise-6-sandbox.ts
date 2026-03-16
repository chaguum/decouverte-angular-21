import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

type RoleOption = 'developer' | 'lead' | 'qa';

interface ProfileFormValue {
  name: string;
  email: string;
  role: RoleOption;
  wantsNewsletter: boolean;
}

@Component({
  selector: 'app-exercise-6-sandbox',
  imports: [ReactiveFormsModule],
  templateUrl: './exercise-6-sandbox.html',
  styleUrl: './exercise-6-sandbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise6Sandbox {
  protected readonly steps = [
    'Observer la structure actuelle basee sur FormGroup et FormControl.',
    'Remplacer la definition du formulaire par un modele signal.',
    'Construire un formulaire Signal Forms avec form().',
    'Relier les champs au template avec [formField].',
    'Conserver la validation, le bouton de pre-remplissage et la soumission.'
  ] as const;

  protected readonly roleOptions = [
    { label: 'Developpeur', value: 'developer' },
    { label: 'Lead dev', value: 'lead' },
    { label: 'QA', value: 'qa' }
  ] as const;

  protected readonly profileForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    role: new FormControl<RoleOption>('developer', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    wantsNewsletter: new FormControl(false, { nonNullable: true })
  });

  protected submittedProfile: ProfileFormValue | null = null;

  protected fillDemoProfile(): void {
    this.profileForm.patchValue({
      name: 'Lea Martin',
      email: 'lea.martin@atos.local',
      role: 'lead',
      wantsNewsletter: true
    });
  }

  protected onSubmit(): void {
    this.profileForm.markAllAsTouched();

    if (this.profileForm.invalid) {
      return;
    }

    this.submittedProfile = this.profileForm.getRawValue();
  }

  protected fieldError(fieldName: keyof ProfileFormValue): string | null {
    const control = this.profileForm.controls[fieldName];

    if (!control.touched || !control.invalid) {
      return null;
    }

    if (control.hasError('required')) {
      return 'Ce champ est obligatoire.';
    }

    if (control.hasError('email')) {
      return 'Adresse email invalide.';
    }

    if (control.hasError('minlength')) {
      return 'Minimum 3 caracteres.';
    }

    return 'Champ invalide.';
  }

  protected currentValue(): ProfileFormValue {
    return this.profileForm.getRawValue();
  }
}
