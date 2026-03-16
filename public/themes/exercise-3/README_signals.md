# Exercice 3 - Signals

## Contexte

Les signals sont l un des changements les plus importants pour une equipe qui vient d Angular 16.
Ils introduisent une nouvelle facon de gerer l etat local et les derivees d etat.

L enjeu pedagogique ici est important:
il ne s agit pas de "remplacer RxJS partout".
Il s agit de comprendre comment Angular propose aujourd hui un modele reactif plus simple pour
les cas locaux et les interactions de composant.

## Pourquoi ce changement ?

Historiquement, beaucoup de devs Angular ont pris l habitude de tout penser en Observables,
meme pour un etat purement local comme:
- un compteur
- un texte de filtre
- une liste filtree

Les signals simplifient ces cas:
- `signal()` pour la valeur source
- `computed()` pour une valeur derivee
- `effect()` pour un effet de bord

Angular a aussi modernise l API des composants avec `input()`, `output()` et `model()`,
pour mieux s integrer a cette approche.

## Ce qu on faisait avant

On voyait souvent du state local gere avec:
- des proprietes classiques
- du `Subject` ou `BehaviorSubject`
- beaucoup de logique imperative autour du template

Cette approche fonctionne, mais elle est parfois trop lourde pour des besoins simples.

## Ce qu on fait maintenant

On distingue plus clairement:

- la source: `signal()`
- le calcul: `computed()`
- la reaction: `effect()`

Et pour les composants:
- `input()` modernise l entree
- `output()` modernise la sortie
- `model()` simplifie certains cas de liaison bidirectionnelle

## Mise en place

Retenez cette regle tres importante:

1. Un signal represente une valeur reactive.
2. Un computed derive une valeur sans effet de bord.
3. Un effect sert seulement quand il faut reagir au monde exterieur.

Le vrai gain, c est de mieux separer "ce qui se calcule" de "ce qui provoque une action".

## Mission

Construire un mini filtre interactif:
- une valeur de recherche stockee dans un signal
- une liste filtree via `computed()`
- un affichage simple des resultats

Bonus si besoin:
- un composant enfant avec `input()`
- une action utilisateur exposee par `output()`

## Ce que vous devez comprendre a la fin

- quand un signal est plus simple qu un `BehaviorSubject`
- pourquoi `computed()` est preferable a un recalcul manuel
- pourquoi `effect()` doit rester reserve aux effets de bord

## Criteres de validation

- au moins un `signal()` est utilise pour l etat local
- au moins un `computed()` est utilise pour une valeur derivee
- l exercice ne s appuie pas sur RxJS pour un besoin purement local

## Ressources officielles

- Signals: [https://angular.dev/guide/signals](https://angular.dev/guide/signals)
- Inputs guide: [https://angular.dev/guide/components/inputs](https://angular.dev/guide/components/inputs)
- Outputs guide: [https://angular.dev/guide/components/outputs](https://angular.dev/guide/components/outputs)
- API `model()`: [https://angular.dev/api/core/model](https://angular.dev/api/core/model)
