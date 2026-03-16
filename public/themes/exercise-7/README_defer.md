# Exercice 7 - @defer

## Contexte

Quand on voit `@defer` pour la premiere fois, on peut croire que c est juste une nouvelle
syntaxe pour masquer un bloc.

Ce n est pas le cas.

`@defer` ne sert pas d abord a cacher du contenu.
Il sert a **retarder le chargement du code d une zone non critique**.

Le but de cet exercice est donc de bien distinguer deux idees:

- afficher ou masquer un bloc deja charge
- charger ce bloc plus tard, seulement quand on en a besoin

## Pourquoi ce sujet est important

Sur beaucoup d ecrans, certaines zones ne sont pas necessaires tout de suite:

- un panneau de statistiques
- un bloc de conseils
- un widget secondaire
- une zone rarement ouverte

Si on charge tout des le premier rendu, on alourdit le chargement initial sans benefice
immediat pour l utilisateur.

`@defer` permet de dire a Angular:
“ce morceau peut attendre”.

La documentation officielle Angular explique bien cet objectif:
les blocs `@defer` reduisent le code necessaire au rendu initial et peuvent ameliorer le
ressenti de chargement et les Core Web Vitals. Source officielle:
[Deferred loading with @defer](https://angular.dev/guide/templates/defer)

## Ce que montre la sandbox

La sandbox prend une approche tres classique:

```html
<button type="button" (click)="toggleDetails()">
  Afficher les statistiques detaillees
</button>

@if (showDetails()) {
  <app-exercise-7-heavy-stats />
}
```

Ce code est simple, mais il faut etre precis sur ce qu il fait.

Il **affiche ou masque** le composant detaille.
En revanche, le composant est deja connu et charge par la page.

Donc:

- UX: oui, on revele le panneau plus tard
- chargement de code: non, il n est pas vraiment differe

Autrement dit:
`@if` controle le rendu.
`@defer` controle le moment du chargement.

## Ce que montre le resultat attendu

Le resultat attendu fait passer le panneau detaille dans un bloc `@defer`.

Exemple simplifie:

```html
@defer (on interaction) {
  <app-exercise-7-heavy-stats />
} @placeholder {
  <button type="button">Afficher les statistiques detaillees</button>
}
```

Ici, le bouton du placeholder sert de declencheur.
Le composant detaille n est charge qu au moment de l interaction.

## Les blocs importants a connaitre

### Bloc principal `@defer`

```html
@defer {
  <app-heavy-panel />
}
```

C est la zone differee.
Par defaut, Angular la charge quand le navigateur devient idle.

### `@placeholder`

```html
@defer {
  <app-heavy-panel />
} @placeholder {
  <p>Le panneau detaille sera charge plus tard.</p>
}
```

Le placeholder est ce que l utilisateur voit avant le declenchement.

Dans cet exercice, on l utilise sous forme de bouton.

### `@loading`

```html
@defer (on interaction) {
  <app-heavy-panel />
} @placeholder {
  <button type="button">Afficher le panneau</button>
} @loading (after 100ms; minimum 700ms) {
  <p>Chargement du panneau detaille...</p>
}
```

Le bloc `@loading` apparait quand le chargement a commence.

Les options utiles ici sont:

- `after`: attendre un peu avant d afficher le loading
- `minimum`: eviter un clignotement trop rapide

### `@error`

```html
@defer {
  <app-heavy-panel />
} @error {
  <p>Le panneau detaille n a pas pu etre charge.</p>
}
```

Ce bloc s affiche si le chargement echoue.

Dans cet atelier, c est surtout pour montrer la structure complete d un bloc `@defer`.

## Les triggers utiles a retenir

Angular supporte plusieurs facons de declencher le chargement:

- `on idle`
- `on viewport`
- `on interaction`
- `on hover`
- `on immediate`
- `on timer(500ms)`
- `when expression`

Pour cet exercice, on choisit volontairement:

```html
@defer (on interaction) {
  <app-exercise-7-heavy-stats />
}
```

Pourquoi ce choix:

- simple a comprendre
- simple a demontrer
- tres visuel en atelier

## Deux points techniques tres importants

La doc Angular insiste sur deux conditions pour qu un bloc soit vraiment differe:

1. Les dependances a l interieur du bloc doivent etre **standalone**.
2. Elles ne doivent pas etre **referencees ailleurs dans le meme fichier de template**.

Dans notre correction:

- `Exercise7HeavyStats` est un composant standalone moderne
- dans le fichier du resultat, il n apparait que dans le bloc `@defer`

Si vous reutilisez ce composant detaille ailleurs dans le meme template, Angular risque de
le charger eagerment, et vous perdez l interet de `@defer`.

## Architecture de l exercice

- `Exercise7Sandbox`
  montre un panneau simplement masque avec `@if`
- `Exercise7Result`
  montre le meme ecran avec `@defer`
- `Exercise7HeavyStats`
  represente le bloc secondaire a charger plus tard

## Mission

1. Reperez dans la sandbox le composant detaille charge directement.
2. Remplacez la logique `bouton + @if` par un vrai bloc `@defer`.
3. Ajoutez un `@placeholder` clair pour l utilisateur.
4. Ajoutez un `@loading`.
5. Gardez le contenu principal visible immediatement.
6. Verifiez que le composant detaille reste reserve a la zone secondaire.

## Ce qu il faut retenir

- `@if` ne differe pas le chargement du code
- `@defer` differe le chargement du code
- il faut l utiliser sur des zones secondaires, pas sur le contenu critique
- `@placeholder` et `@loading` font partie de la qualite UX
- les dependances du bloc differe doivent etre standalone

## Criteres de validation

- la fiche principale reste visible immediatement
- le panneau detaille est charge avec `@defer`
- un `@placeholder` est present
- un `@loading` est present
- l equipe sait expliquer pourquoi ce bloc est un bon candidat au defer

## Ressources officielles

- Guide officiel Angular `@defer`:
  [https://angular.dev/guide/templates/defer](https://angular.dev/guide/templates/defer)
