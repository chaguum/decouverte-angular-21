# Exercice 3.5 - Signals et input/output

## Contexte

Cet exercice prolonge directement l exercice 3.
Le state local du parent est deja gere avec les Signals, mais nous ajoutons maintenant un
composant enfant de resume pour introduire la communication parent/enfant.

L idee est simple:

- le parent reste la source de verite
- l enfant affiche un resume du state
- l enfant emet une intention utilisateur tres simple: afficher ou non uniquement les produits disponibles

## Pourquoi Angular a introduit ce changement

Pendant longtemps, les composants Angular ont communique avec `@Input()` et `@Output()`.
Ces APIs restent valides, mais Angular propose aujourd hui des APIs plus directes:

- `input()` pour declarer une entree
- `output()` pour declarer une sortie

L avantage est double:

- la declaration est plus concise
- la lecture est plus coherente avec les autres primitives modernes Angular

Dans un projet Angular recent, cette ecriture devient la reference a connaitre.

## Ce qu on faisait avant

Dans la sandbox, le parent est deja moderne:

- il utilise `signal()`, `computed()` et `effect()`
- il filtre la liste de produits
- il calcule le compteur et le titre de page

En revanche, le composant enfant de resume reste ecrit a l ancienne:

- `@Input()` pour recevoir les donnees
- `@Output()` et `EventEmitter` pour remonter le changement du switch

## Ce qu on fait maintenant

Dans le resultat attendu, le composant enfant utilise:

- `input.required<number>()`
- `input.required<string>()`
- `input.required<boolean>()`
- `output<boolean>()`

Le parent, lui, ne change presque pas.
Il continue a posseder le state et a reagir a l evenement emis par l enfant.

## Architecture de l exercice

- `Exercise35` sert de parent de page
- `Exercise35Sandbox` montre un parent en Signals avec un enfant legacy
- `Exercise35Result` montre le meme parent avec un enfant moderne

Le but pedagogique est volontairement cible:
comprendre comment moderniser la communication composant parent/enfant sans toucher au coeur du state.

## Mission

Votre objectif est de moderniser le composant enfant de resume.

Ce que vous devez faire:

1. remplacer `@Input()` par `input()`
2. remplacer `@Output()` et `EventEmitter` par `output()`
3. conserver le meme contrat d utilisation cote parent
4. verifier que le switch "uniquement disponibles" continue a filtrer la liste

## Ce que l equipe doit comprendre a la fin

- le parent reste proprietaire du state
- l enfant recoit des donnees via `input()`
- l enfant remonte une intention via `output()`
- `input()` et `output()` sont les APIs modernes a connaitre sur Angular recent

## Criteres de validation

- le composant enfant n utilise plus `@Input()` ni `@Output()`
- `input()` et `output()` sont utilises correctement
- le parent garde la responsabilite du state
- le filtre "uniquement disponibles" fonctionne toujours
- le compteur et le titre de page restent coherents

## Ressources officielles

- Signals: [https://angular.dev/guide/signals](https://angular.dev/guide/signals)
- Inputs: [https://angular.dev/guide/components/inputs](https://angular.dev/guide/components/inputs)
- Outputs: [https://angular.dev/guide/components/outputs](https://angular.dev/guide/components/outputs)
