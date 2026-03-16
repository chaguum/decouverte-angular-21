# Exercice 2 - Controle de flux et @let

## Contexte

Si votre equipe vient d Angular 16, elle ecrit probablement encore ses templates avec:

- `*ngIf`
- `*ngFor`
- parfois `*ngSwitch`

Angular propose maintenant une nouvelle ecriture:

- `@if`
- `@for`
- `@switch`
- `@let`

Le sujet n est pas un simple changement de style.
Le sujet est la lisibilite du template.

## Pourquoi Angular a introduit ce changement

Le but est de rendre les templates:

- plus directs a lire
- moins verbeux
- plus explicites sur l intention

Il y a aussi un point important a faire passer:
avec `@for`, Angular met beaucoup plus en avant la notion de `track`, qui est essentielle pour eviter des mises a jour DOM inutiles.

## Ce qu on faisait avant

Avant, un template simple pouvait ressembler a ceci:

```html
<section *ngIf="filteredMovies.length > 0; else emptyState">
  <article *ngFor="let movie of filteredMovies; trackBy: trackByMovieId">
    {{ movie.title }}
  </article>
</section>

<ng-template #emptyState>
  <p>Aucun film trouve.</p>
</ng-template>
```

Cette ecriture fonctionne, mais elle devient vite plus lourde quand le template grossit.

## Ce qu on fait maintenant

Le meme cas peut s ecrire ainsi:

```html
@let visibleMovies = filteredMovies();

@if (visibleMovies.length > 0) {
  @for (movie of visibleMovies; track movie.id) {
    <article>{{ movie.title }}</article>
  }
} @else {
  <p>Aucun film trouve.</p>
}
```

Le template raconte mieux ce qu il fait:

- `@let` donne un nom a la liste visible
- `@if` gere le cas vide
- `@for` parcourt la liste avec un `track` explicite

## Exemples de code utiles

### Exemple simple avec `@if`

Avant:

```html
<p *ngIf="movies.length === 0">Aucun film trouve.</p>
```

Maintenant:

```html
@if (movies.length === 0) {
  <p>Aucun film trouve.</p>
}
```

### Exemple simple avec `@for`

Avant:

```html
<li *ngFor="let movie of movies; trackBy: trackByMovieId">
  {{ movie.title }}
</li>
```

Maintenant:

```html
@for (movie of movies; track movie.id) {
  <li>{{ movie.title }}</li>
}
```

### Exemple utile avec `@let`

Avant:

```html
<p>{{ filteredMovies.length }} resultat(s)</p>
<button [disabled]="filteredMovies.length === 0">Exporter</button>
```

Maintenant:

```html
@let count = filteredMovies().length;

<p>{{ count }} resultat(s)</p>
<button [disabled]="count === 0">Exporter</button>
```

## Architecture de l exercice

- `Exercise2` : le parent de page
- `Exercise2Sandbox` : le point de depart en syntaxe historique
- `Exercise2Result` : la version moderne Angular

La page d exercice sert a comparer rapidement les deux syntaxes.

## Mission

Votre objectif est de transformer le template sans changer le comportement fonctionnel.

Ce que vous devez faire:

1. remplacer `*ngIf` par `@if`
2. remplacer `*ngFor` par `@for`
3. ajouter un `track` pertinent
4. introduire `@let` pour eviter une repetition
5. supprimer `CommonModule` si vous n en avez plus besoin

## Ce que l equipe doit comprendre a la fin

- la nouvelle syntaxe de controle de flux n est pas un gadget
- `@for` rend le `track` beaucoup plus visible
- `@let` sert a clarifier le template, pas a faire des astuces
- un template moderne Angular peut devenir plus lisible avec moins de bruit

## Criteres de validation

- le template final n utilise plus `*ngIf` ni `*ngFor`
- `@let` est utilise de maniere utile
- la liste des films se comporte exactement comme avant
- `track` repose sur une cle stable
- `CommonModule` a disparu si le composant n utilise plus les anciennes directives

## Ressources officielles

- Control flow: [https://angular.dev/guide/templates/control-flow](https://angular.dev/guide/templates/control-flow)
- Variables en template et `@let`: [https://angular.dev/guide/templates/variables](https://angular.dev/guide/templates/variables)
