import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';

type RoleOption = 'developer' | 'lead' | 'qa';

interface ProfileModel {
  name: string;
  email: string;
  role: RoleOption;
  wantsNewsletter: boolean;
}

@Component({
  selector: 'app-exercise-6-result',
  imports: [FormField],
  templateUrl: './exercise-6-result.html',
  styleUrl: './exercise-6-result.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise6Result {
  protected readonly roleOptions = [
    { label: 'Developpeur', value: 'developer' },
    { label: 'Lead dev', value: 'lead' },
    { label: 'QA', value: 'qa' }
  ] as const;

  protected readonly profileModel = signal<ProfileModel>({
    name: '',
    email: '',
    role: 'developer',
    wantsNewsletter: false
  });

  protected readonly profileForm = form(this.profileModel, (path) => {
    required(path.name, { message: 'Le nom est obligatoire.' });
    minLength(path.name, 3, { message: 'Minimum 3 caracteres.' });
    required(path.email, { message: 'L email est obligatoire.' });
    email(path.email, { message: 'Adresse email invalide.' });
    required(path.role, { message: 'Le role est obligatoire.' });
  });

  protected readonly submittedProfile = signal<ProfileModel | null>(null);

  protected fillDemoProfile(): void {
    this.profileForm.name().value.set('Lea Martin');
    this.profileForm.email().value.set('lea.martin@atos.local');
    this.profileForm.role().value.set('lead');
    this.profileForm.wantsNewsletter().value.set(true);
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.profileForm.name().markAsTouched();
    this.profileForm.email().markAsTouched();
    this.profileForm.role().markAsTouched();

    if (this.profileForm.name().invalid() || this.profileForm.email().invalid() || this.profileForm.role().invalid()) {
      return;
    }

    this.submittedProfile.set({ ...this.profileModel() });
  }
}
