# Exercice 7 - @defer

## Contexte

Quand on decouvre une nouveaute Angular, on cherche souvent d abord la syntaxe.
Pour `@defer`, ce serait une erreur.

Le vrai sujet de `@defer`, ce n est pas la syntaxe.
Le vrai sujet, c est la performance percue par l utilisateur.

Angular vous donne ici un outil pour retarder le chargement d une partie de l interface
jusqu au bon moment.

## Pourquoi ce changement est utile ?

Dans beaucoup d ecrans, tout n a pas besoin d arriver immediatement:
- un bloc de statistiques
- un panneau secondaire
- un widget lourd
- une zone rarement consultee

Avant, ce genre d optimisation demandait plus de code et plus de plomberie.
Avec `@defer`, Angular rend ce cas beaucoup plus accessible.

## Ce qu on fait maintenant

On peut ecrire un bloc differe, puis preciser quand il doit se charger:
- quand l utilisateur le voit
- quand le navigateur est au repos
- quand il survole une zone
- quand une condition est remplie

L idee n est pas de tout deferer.
L idee est de choisir intelligemment ce qui peut attendre.

## Mission

Afficher une page avec:
- un contenu principal immediat
- un bloc secondaire charge plus tard avec `@defer`

Exemple:
- une fiche produit visible tout de suite
- un bloc "statistiques detaillees" ou "conseils" charge ensuite

## Ce que vous devez comprendre a la fin

- pourquoi `@defer` ameliore le ressenti utilisateur
- pourquoi il faut reserver cette technique aux zones secondaires ou lourdes
- comment Angular simplifie ce type d optimisation

## Criteres de validation

- une partie utile de la page s affiche immediatement
- une partie secondaire est differee avec `@defer`
- l equipe sait expliquer pourquoi ce bloc a ete differe

## Ressources officielles

- Deferred loading with `@defer`: [https://angular.dev/guide/templates/defer](https://angular.dev/guide/templates/defer)

