import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

import {
  MemberProfile,
  MemberProfileCard
} from './components/member-profile-card/member-profile-card';
import { MemberSkillList } from './components/member-skill-list/member-skill-list';
import { getWorkshopTopic } from '../../workshop-topics';

@Component({
  selector: 'app-exercise-1',
  standalone: true,
  imports: [CommonModule, CardModule, DividerModule, TagModule, MemberProfileCard, MemberSkillList],
  templateUrl: './exercise-1.html',
  styleUrl: './exercise-1.css'
})
export class Exercise1 {
  protected readonly topic = getWorkshopTopic('standalone');
  protected readonly member: MemberProfile = {
    name: 'Lea Martin',
    role: 'Developpeuse Angular',
    team: 'Equipe Front',
    mood: 'Pret a supprimer les NgModule inutiles',
    avatar: '🧩',
    summary:
      'Cette fiche est composee de composants standalone importes directement par le parent.'
  };

  protected readonly strengths = ['Standalone component', 'loadComponent', 'imports locaux'];

  protected readonly mission = [
    'Creer une page standalone chargee par la route /exercise-1 via loadComponent.',
    'Composer la page avec 2 composants enfants standalone.',
    'Importer CommonModule ou les modules PrimeNG seulement la ou ils sont necessaires.',
    'Ne pas creer de NgModule pour cette feature.'
  ] as const;

  protected readonly validation = [
    'Le parent Exercise1 importe directement ses composants enfants.',
    'Chaque enfant declare standalone et ses propres imports.',
    'La page reste lisible sans declarations ou exports dans un module.',
    'Le rendu final affiche correctement la fiche et les badges.'
  ] as const;
}
