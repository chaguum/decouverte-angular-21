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
  selector: 'app-exercise-2-result',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './exercise-2-result.html',
  styleUrl: './exercise-2-result.css'
})
export class Exercise2Result {
  protected searchTerm = '';
  protected statusFilter: MovieFilter = 'all';

  protected readonly statusLabels: Record<MovieFilter, string> = {
    all: 'Tous',
    watched: 'Deja vus',
    todo: 'A voir'
  };

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
}
