# Exercice 2 - Controle de flux et @let

## Contexte

Pendant des annees, les templates Angular ont ete ecrits avec `*ngIf`, `*ngFor` et `*ngSwitch`.
Si vous venez d Angular 16, c est probablement encore votre ecriture naturelle.

Depuis Angular 17, Angular propose une nouvelle syntaxe de controle de flux:
`@if`, `@for`, `@switch` et `@let`.

Ce n est pas juste une variation de style.
L objectif est de rendre les templates plus proches d une vraie logique de lecture, plus lisibles,
et plus faciles a maintenir.

## Pourquoi ce changement ?

L ancienne syntaxe a fonctionne tres longtemps, mais elle avait deux limites pedagogiques:
- elle etait basee sur des directives structurelles un peu "speciales"
- elle devenait vite difficile a lire quand on imbriquait plusieurs conditions et boucles

La nouvelle syntaxe rend le template plus direct.
Quand on lit `@if` ou `@for`, on comprend tout de suite l intention.

`@let` apporte aussi une vraie amelioration:
il permet de nommer une valeur intermediaire dans le template au lieu de repeter une expression.

## Ce qu on faisait avant

```html
<section *ngIf="user">
  <li *ngFor="let skill of user.skills; trackBy: trackSkill">
    {{ skill }}
  </li>
</section>
```

Cela marche, mais la lecture devient vite plus lourde quand le template grossit.

## Ce qu on fait maintenant

```html
@if (user; as currentUser) {
  @let skills = currentUser.skills;

  @for (skill of skills; track skill) {
    <li>{{ skill }}</li>
  }
}
```

Le code est plus lineaire, plus explicite, et plus simple a expliquer a quelqu un qui decouvre Angular.

## Mise en place

Voici les idees a retenir:

1. `@if` remplace les cas simples de `*ngIf`.
2. `@for` remplace `*ngFor`, avec `track` directement visible.
3. `@let` permet d eviter les expressions repetees.

Cette syntaxe est faite pour clarifier le template, pas pour faire "plus moderne" gratuitement.

## Mission

Transformer un template existant:
- remplacer `*ngIf` par `@if`
- remplacer `*ngFor` par `@for`
- utiliser `@let` pour extraire une valeur repetee

L exercice doit rester court:
on veut observer le gain de lisibilite, pas construire une grosse logique.

## Ce que vous devez comprendre a la fin

- pourquoi Angular a modernise l ecriture des templates
- quand `@let` ameliore reellement la lecture
- pourquoi `track` reste important avec `@for`

## Criteres de validation

- le template n utilise plus `*ngIf` ni `*ngFor`
- `@let` est utilise au moins une fois de facon pertinente
- la page garde exactement le meme comportement fonctionnel

## Ressources officielles

- Control flow: [https://angular.dev/guide/templates/control-flow](https://angular.dev/guide/templates/control-flow)
- Template variables et `@let`: [https://angular.dev/guide/templates/variables](https://angular.dev/guide/templates/variables)

