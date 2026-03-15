import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

export interface MemberProfile {
  readonly name: string;
  readonly role: string;
  readonly team: string;
  readonly mood: string;
  readonly avatar: string;
  readonly summary: string;
}

@Component({
  selector: 'app-member-profile-card',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule],
  templateUrl: './member-profile-card.html',
  styleUrl: './member-profile-card.css'
})
export class MemberProfileCard {
  @Input({ required: true }) member!: MemberProfile;
}
