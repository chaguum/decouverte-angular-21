import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type MovieFilter = 'all' | 'watched' | 'todo';

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  seen: boolean;
}

@Component({
  selector: 'app-exercise-2-sandbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exercise-2-sandbox.html',
  styleUrl: './exercise-2-sandbox.css'
})
export class Exercise2Sandbox {
  protected searchTerm = '';
  protected statusFilter: MovieFilter = 'all';

  protected readonly statusLabels: Record<MovieFilter, string> = {
    all: 'Tous',
    watched: 'Deja vus',
    todo: 'A voir'
  };

  protected readonly steps = [
    'Remplacer les usages de *ngIf par @if.',
    'Remplacer la boucle *ngFor par @for.',
    'Utiliser un track stable pour la boucle @for.',
    'Introduire @let pour eviter de repeter des expressions dans le template.',
  ] as const;

  protected readonly movies: Movie[] = [
    { id: 1, title: 'Dune', year: 2021, genre: 'Science-fiction', seen: true },
    { id: 2, title: 'Spider-Man: Across the Spider-Verse', year: 2023, genre: 'Animation', seen: false },
    { id: 3, title: 'Past Lives', year: 2023, genre: 'Drame', seen: true },
    { id: 4, title: 'The Batman', year: 2022, genre: 'Action', seen: false }
  ];

  protected get filteredMovies(): Movie[] {
    const search = this.searchTerm.trim().toLowerCase();

    return this.movies.filter((movie) => {
      const matchesSearch =
        search.length === 0 ||
        movie.title.toLowerCase().includes(search) ||
        movie.genre.toLowerCase().includes(search);
      const matchesStatus =
        this.statusFilter === 'all' ||
        (this.statusFilter === 'watched' && movie.seen) ||
        (this.statusFilter === 'todo' && !movie.seen);

      return matchesSearch && matchesStatus;
    });
  }

  protected trackMovie(_index: number, movie: Movie): number {
    return movie.id;
  }
}
