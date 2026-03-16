# Exercice 3 - Signals

## Contexte

Les Signals sont l une des evolutions les plus importantes pour une equipe qui vient d Angular 16.
Ils changent surtout la maniere de gerer le state local dans un composant.

Dans cet exercice, nous prenons un cas volontairement tres simple:
un mini catalogue de produits avec une recherche, un filtre par categorie et un compteur de resultats.

L interet pedagogique est le suivant:
comparer une implementation "classique" basee sur des proprietes et des getters, avec une
implementation basee sur `signal()`, `computed()` et `effect()`.

## Pourquoi Angular a introduit ce changement

Pendant longtemps, le state local Angular a souvent ete gere de facon imperative:

- une propriete pour stocker une valeur
- un getter ou une methode pour recalculer une derivee
- des appels manuels quand il fallait synchroniser un effet externe

Cela fonctionne, mais la logique reactive est alors dispersee dans le composant.

Avec les Signals, Angular propose une separation plus nette:

- `signal()` pour les valeurs sources
- `computed()` pour les valeurs derivees
- `effect()` pour les effets de bord

Autrement dit:
on distingue clairement ce qui constitue l etat, ce qui se calcule a partir de cet etat,
et ce qui doit produire une action externe.

## Ce qu on faisait avant

Dans la sandbox, vous partez d un composant tout a fait courant:

- `searchTerm` et `selectedCategory` sont de simples proprietes
- la liste filtree repose sur un getter
- le compteur repose sur un autre getter
- le titre de page est mis a jour manuellement dans plusieurs endroits

Le composant fonctionne, mais il faut penser soi-meme a garder les choses synchronisees.

## Ce qu on fait maintenant

Dans le resultat attendu:

- `searchTerm` devient un `signal()`
- `selectedCategory` devient un `signal()`
- `filteredProducts` devient un `computed()`
- `resultsCount` devient un `computed()`
- `pageTitle` devient un `computed()`
- un `effect()` synchronise automatiquement `document.title`

Le comportement reste identique, mais l organisation du code est plus explicite.

## Architecture de l exercice

- `Exercise3` joue le role de parent
- `Exercise3Sandbox` montre une gestion classique du state local
- `Exercise3Result` montre la meme interface avec une implementation Signals

Le switch du header permet de comparer rapidement la zone de travail et la correction.

## Mission

Votre objectif est de transformer la sandbox sans changer le comportement utilisateur.

Ce que vous devez faire:

1. convertir l etat local en `signal()`
2. remplacer les getters de derivees par des `computed()`
3. creer un `computed()` pour le titre de page
4. utiliser un `effect()` pour synchroniser ce titre avec le navigateur

## Ce que l equipe doit comprendre a la fin

- `signal()` sert a modeliser une source de verite locale
- `computed()` doit contenir les derivees pures
- `effect()` ne sert pas a recalculer du state metier
- le vrai gain des Signals est la clarte de la dependance reactive

## Criteres de validation

- au moins deux valeurs sources sont gerees avec `signal()`
- la liste filtree est derivee avec `computed()`
- le compteur est derive avec `computed()`
- le titre de page est synchronise par un `effect()`
- le comportement visuel de la page reste identique

## Ressources officielles

- Signals: [https://angular.dev/guide/signals](https://angular.dev/guide/signals)
