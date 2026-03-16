import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';

interface ResultProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
  wantsNewsletter: boolean;
}

interface RoleOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-exercise-1-result',
  standalone: true,
  imports: [FormsModule, Button, Checkbox, InputText, Select, Textarea],
  templateUrl: './exercise-1-result.html',
  styleUrl: './exercise-1-result.css'
})
export class Exercise1Result {
  protected readonly roles: RoleOption[] = [
    { label: 'Developpeur Angular', value: 'Developpeur Angular' },
    { label: 'Lead dev', value: 'Lead dev' },
    { label: 'QA', value: 'QA' },
    { label: 'Product Owner', value: 'Product Owner' }
  ];

  protected readonly profile: ResultProfile = {
    name: 'Lea Martin',
    email: 'lea.martin@atos.local',
    role: 'Developpeur Angular',
    bio: 'Formulaire realise avec des composants standalone PrimeNG importes directement.',
    wantsNewsletter: true
  };
}
