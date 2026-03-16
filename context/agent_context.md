# Contexte Agent - Atelier Angular 21

## Objectif du projet

Le projet sert de support d exercice pour une equipe habituee a Angular 16.
Le but est de faire decouvrir rapidement les nouveautes Angular jusqu a Angular 21 pendant une demi-journee.

La contrainte principale est la suivante:

- chaque exercice doit etre tres rapide a comprendre et a realiser
- il faut viser des micro-exercices de 10 a 15 minutes
- l effort doit porter sur Angular, pas sur l UI

## Methode de travail avec l agent

Pour avancer vite, on utilise toujours le meme cycle:

1. Valider le theme de l exercice.
2. Definir un micro-scenario simple.
3. Definir clairement:
   - le point de depart
   - la cible finale
4. Implementer directement:
   - le composant parent de l exercice
   - la sandbox
   - le resultat attendu
   - le README pedagogique
5. Corriger seulement le niveau de difficulte si besoin.

## Regles a respecter pour tous les exercices

- 1 exercice = 1 idee Angular principale
- 1 exercice doit etre faisable rapidement
- pas de logique metier lourde
- pas de backend
- UI simple et sans sophistication inutile
- le code doit etre pedagogique avant d etre elegant

## Structure attendue pour chaque exercice

Chaque exercice doit suivre ce pattern:

- un composant parent `ExerciseX`
- un composant `ExerciseXSandbox`
- un composant `ExerciseXResult`

### Role du parent

Le parent ne doit pas contenir toute la logique du TP.
Il sert seulement a:

- poser le contexte
- afficher un switch clair
- monter soit la sandbox, soit le resultat attendu

### Role de la sandbox

La sandbox represente le point de depart de l exercice.
Elle doit etre:

- imparfaite volontairement
- facile a modifier
- orientee apprentissage

La sandbox peut demarrer avec une approche plus ancienne si c est pedagogiquement utile.

### Role du resultat attendu

Le resultat attendu sert de correction.
Il doit montrer la cible finale la plus claire possible.

Le composant `Result` doit:

- etre lisible
- montrer explicitement les imports utiles
- illustrer la bonne pratique attendue

## Switch de navigation dans l exercice

Chaque parent d exercice doit afficher un switch tres lisible:

- `Sandbox de l exercice`
- `Resultat attendu`

L utilisateur doit comprendre immediatement:

- ou il travaille
- ou se trouve la correction

## Format du README par exercice

Chaque exercice doit avoir un README dedie dans `public/themes/exercise-X/`.

Le README doit rester court et pedagogique, avec cette structure:

1. Contexte
2. Pourquoi Angular a introduit ce changement
3. Ce qu on faisait avant
4. Ce qu on fait maintenant
5. Architecture de l exercice
6. Mission
7. Ce que l equipe doit comprendre a la fin
8. Criteres de validation
9. Ressources officielles

Le ton attendu:

- clair
- progressif
- professoral
- sans jargon inutile

## Demande ideale pour aller vite

Quand on lance un nouvel exercice, la demande ideale contient:

1. le theme
2. ce que doit montrer la sandbox
3. ce que doit montrer le resultat attendu
4. la difficulte souhaitee
5. si la correction doit utiliser PrimeNG ou non

Exemple:

```text
Exercice 2 : controle de flux + @let
sandbox : vieux template avec *ngIf/*ngFor
resultat : template moderne avec @if/@for/@let
difficulte : tres legere
UI : simple
```

## Pattern valide pour l exercice 1

L exercice 1 sert maintenant de reference de structure.

### Theme

Standalone

### Architecture validee

- `Exercise1` = parent
- `Exercise1Sandbox` = point de depart legacy
- `Exercise1Result` = correction finale

### Intention pedagogique

La sandbox demarre volontairement avec une approche ancienne:

- composant non-standalone
- `FormsModule` dans un module annexe

La correction montre la cible:

- composants standalone
- imports locaux
- formulaire realise avec des composants standalone PrimeNG

### Ce que l equipe doit faire

- supprimer la dependance au module intermediaire
- remettre `FormsModule` au bon endroit
- passer a une approche standalone
- observer la correction finale PrimeNG standalone

## Sujets actuellement presents dans le projet

Ordre courant:

1. Standalone
2. Controle de flux + `@let`
3. Signals
4. Signals et `input` / `output`
5. Interop RxJS / Signals
6. NgRx Signal Store
7. Signal Forms
8. Signal queries

Correspondance des routes:

- `exercise-1` = Standalone
- `exercise-2` = Controle de flux + `@let`
- `exercise-3` = Signals
- `exercise-3-5` = Signals et input/output
- `exercise-4` = Interop RxJS / Signals
- `exercise-5` = NgRx Signal Store
- `exercise-6` = Signal Forms
- `exercise-7` = Signal queries

## Principe general

L agent doit toujours privilegier:

- la clarte pedagogique
- la rapidite d execution
- une structure uniforme entre exercices

L objectif n est pas de faire une mini application parfaite.
L objectif est de faire apprendre vite.
