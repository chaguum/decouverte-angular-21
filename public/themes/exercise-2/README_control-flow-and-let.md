# Exercice 2 - Controle de flux et @let

## Contexte

Si votre equipe vient d Angular 16, elle ecrit probablement encore ses templates avec
`*ngIf`, `*ngFor` et parfois `*ngSwitch`.

Cela fonctionne tres bien, mais Angular a introduit une nouvelle ecriture pour rendre les
templates plus directs a lire: `@if`, `@for`, `@switch` et `@let`.

Dans cet exercice, nous restons sur un cas volontairement tres simple: une liste de films avec
une recherche et un filtre.

## Pourquoi Angular a introduit ce changement

Le but n est pas seulement d avoir une syntaxe "plus moderne".
Le vrai objectif est pedagogique et pratique:

- rendre l intention du template plus visible
- reduire l effet "directive speciale" de `*ngIf` et `*ngFor`
- mieux structurer les templates un peu plus riches
- eviter de repeter des expressions avec `@let`

La documentation Angular insiste aussi sur l importance du `track` dans `@for`, car il aide
Angular a faire le minimum de mises a jour DOM quand la collection change.

## Ce qu on faisait avant

Dans la sandbox, le template demarre avec une approche classique:

- `*ngIf` pour afficher ou non une section
- `*ngFor` pour parcourir les films
- plusieurs acces repetes a `filteredMovies.length`
- `CommonModule` importe uniquement pour recuperer les directives structurelles

Cette approche reste valide, mais elle devient plus verbeuse quand le template grossit.

## Ce qu on fait maintenant

Dans le resultat attendu, le meme ecran est reecrit avec:

- `@if` pour les branches conditionnelles
- `@for` pour la liste
- `track movie.id` directement dans la boucle
- `@let` pour nommer des valeurs intermediaires comme la liste visible ou son compteur

Un point important a observer:
dans ce resultat, `CommonModule` n est plus necessaire pour le controle de flux.
Le composant garde seulement `FormsModule` pour le formulaire.

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

### Exemple combine avec `@let`

```html
@let visibleMovies = filteredMovies();

@if (visibleMovies.length > 0) {
  @for (movie of visibleMovies; track movie.id) {
    <li>{{ movie.title }}</li>
  }
} @else {
  <p>Aucun film trouve.</p>
}
```

Ce dernier exemple est celui qu il faut viser dans l exercice:

- `@let` donne un nom clair a la liste visible
- `@if` gere l etat vide
- `@for` parcourt la liste avec un `track` explicite

## Architecture de l exercice

- `Exercise2` affiche le contexte de l exercice et choisit la vue
- `Exercise2Sandbox` montre le point de depart en syntaxe historique
- `Exercise2Result` montre la correction en syntaxe moderne Angular

Le switch du header permet de passer rapidement de la zone de travail a la correction.

## Mission

Votre objectif est de transformer le template de la sandbox sans changer le comportement
fonctionnel de la page.

Ce que vous devez faire:

1. remplacer `*ngIf` par `@if`
2. remplacer `*ngFor` par `@for`
3. ajouter un `track` pertinent
4. introduire `@let` pour eviter de repeter une expression du template
5. supprimer `CommonModule` si vous n en avez plus besoin

## Ce que l equipe doit comprendre a la fin

- la nouvelle syntaxe de controle de flux n est pas un gadget
- `@for` rend le `track` plus visible
- `@let` sert a clarifier le template, pas a faire "plus clever"
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
