import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-member-skill-list',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule],
  templateUrl: './member-skill-list.html',
  styleUrl: './member-skill-list.css'
})
export class MemberSkillList {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) items!: readonly string[];
}
