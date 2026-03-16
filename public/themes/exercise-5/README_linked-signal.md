# Exercice 5 - linkedSignal et etat derive

## Contexte

Quand on commence a utiliser les signals, on comprend vite comment stocker une valeur et comment
en deriver une autre avec `computed()`.

Mais un cas subtil apparait rapidement:
que faire quand une valeur depend d une autre, tout en restant modifiable ?

C est exactement le type de probleme que `linkedSignal` aide a modeliser.

## Pourquoi ce sujet est interessant ?

Parce qu il oblige a penser proprement l etat.

Exemple classique:
- on a une liste d elements
- on garde un element selectionne
- la liste change
- on veut conserver la selection si elle existe encore, sinon choisir une autre valeur

Avec une simple variable imperative, on finit vite avec des cas speciaux.
Avec un simple `computed()`, on ne peut pas exprimer correctement le fait que la valeur reste
modulable.

## Ce qu apporte `linkedSignal`

`linkedSignal` permet de definir une valeur reactive qui:
- depend d une source
- sait se recalculer quand la source change
- reste editable comme un vrai signal

Pedagogiquement, c est une excellente etape apres les bases des signals.

## Mission

Construire une mini liste de choix:
- une liste de produits, de films ou de personnages
- une selection courante
- un changement de liste qui tente de conserver la selection

L exercice doit montrer visuellement que la selection suit intelligemment l evolution des donnees.

## Ce que vous devez comprendre a la fin

- pourquoi certains etats derives ne rentrent pas bien dans `computed()`
- quand `linkedSignal` est plus adapte
- comment garder un modele de selection coherent dans le temps

## Criteres de validation

- la selection depend bien de la liste source
- la selection peut encore etre modifiee par l utilisateur
- quand la source change, la valeur s adapte intelligemment

## Ressources officielles

- Linked signal: [https://angular.dev/guide/signals/linked-signal](https://angular.dev/guide/signals/linked-signal)
- Signals guide: [https://angular.dev/guide/signals](https://angular.dev/guide/signals)

