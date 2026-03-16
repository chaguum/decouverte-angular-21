# Exercice 4 - Interop RxJS et Signals

## Contexte

Une equipe venant d Angular 16 ne va pas abandonner RxJS du jour au lendemain, et ce ne serait
pas une bonne idee.

Le vrai sujet n est donc pas "Signals ou RxJS ?".
Le vrai sujet est: "Comment faire cohabiter les deux proprement ?"

Cet exercice sert aussi a clarifier un point de culture generale:
Promises, Observables et Signals ne repondent pas aux memes besoins.

## Promises, Observables, Signals: trois roles differents

### Promise

Une Promise represente en general un resultat unique a venir.
Exemple: recuperer une ressource une seule fois.

### Observable

Un Observable represente un flux dans le temps.
Exemple: WebSocket, formulaire, evenement, polling, combinaison de flux.

### Signal

Un signal represente une valeur reactive courante.
Exemple: etat local, vue derivee, interaction directe avec le template Angular.

Le bon raisonnement n est pas de choisir un "vainqueur".
Le bon raisonnement est de choisir l outil adapte.

## Pourquoi Angular a ajoute une interop officielle ?

Parce qu Angular sait tres bien qu un projet moderne contient souvent:
- des APIs Angular basees sur signals
- des services et streams historiques en RxJS

Angular fournit donc une interop officielle pour relier ces deux mondes sans bricolage.

## Ce qu on fait maintenant

Les outils les plus utiles sont:
- `toSignal()` pour consommer un Observable comme une valeur reactive dans un composant
- `toObservable()` pour retransformer un signal en Observable quand c est utile

## Mission

Partir d un flux RxJS existant et:
- le convertir en signal avec `toSignal()`
- l afficher dans le template
- comparer mentalement ce qui reste un "flux" et ce qui devient une "valeur courante"

L objectif est de comprendre le pont entre deux modeles, pas de refaire toute l architecture.

## Ce que vous devez comprendre a la fin

- pourquoi RxJS reste utile
- pourquoi un signal peut simplifier la consommation d un flux dans un composant
- pourquoi Promise, Observable et Signal ne sont pas interchangeables

## Criteres de validation

- un Observable est converti avec `toSignal()`
- le template lit une valeur issue de cette conversion
- l equipe est capable d expliquer pourquoi le flux source reste un Observable

## Ressources officielles

- RxJS interop with signals: [https://angular.dev/ecosystem/rxjs-interop](https://angular.dev/ecosystem/rxjs-interop)
- Signals guide: [https://angular.dev/guide/signals](https://angular.dev/guide/signals)

