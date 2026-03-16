# Exercice 3 - Signals

## Contexte

Les Signals sont l une des evolutions les plus importantes pour une equipe qui vient d Angular 16.
Ils changent surtout la maniere de gerer le state local dans un composant.

Dans cet exercice, nous prenons un cas volontairement tres simple:
un mini catalogue de produits avec une recherche, un filtre par categorie et plusieurs valeurs
derivees d affichage.

L interet pedagogique est le suivant:
comparer une implementation "classique" basee sur des proprietes et des recalculs manuels, avec
une implementation basee sur `signal()`, `computed()` et `effect()`.

## Pourquoi Angular a introduit ce changement

Pendant longtemps, le state local Angular a souvent ete gere de facon imperative:

- une propriete pour stocker une valeur
- une methode pour recalculer des derivees
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
- la liste filtree, les compteurs et le titre sont recalcules manuellement
- le bouton de reinitialisation oublie volontairement de relancer ce recalcul

Resultat:
les champs du formulaire changent bien, mais le state derive peut rester en retard.

C est le point cle de l exercice:
le vrai gain des Signals n est pas de "rerender plus", mais d eviter ce type de desynchronisation.

## Ce qu on fait maintenant

Dans le resultat attendu:

- `searchTerm` devient un `signal()`
- `selectedCategory` devient un `signal()`
- `filteredProducts` devient un `computed()`
- `resultsCount` devient un `computed()`
- `availableProductsCount` devient un `computed()`
- `pageTitle` devient un `computed()`
- un `effect()` synchronise automatiquement `document.title`

Le comportement reste identique, mais l organisation du code est plus explicite.
Et surtout, le bouton de reinitialisation ne peut plus laisser le state derive en retard.

## Architecture de l exercice

- `Exercise3` joue le role de parent
- `Exercise3Sandbox` montre une gestion classique du state local
- `Exercise3Result` montre la meme interface avec une implementation Signals

Le switch du header permet de comparer rapidement la zone de travail et la correction.

## Mission

Votre objectif est de transformer la sandbox sans changer le comportement utilisateur.

Ce que vous devez faire:

1. convertir l etat local en `signal()`
2. remplacer les recalculs manuels par des `computed()`
3. creer des `computed()` pour les compteurs et le titre de page
4. utiliser un `effect()` pour synchroniser ce titre avec le navigateur
5. verifier que le bouton de reinitialisation ne desynchronise plus l interface

## Ce que l equipe doit comprendre a la fin

- `signal()` sert a modeliser une source de verite locale
- `computed()` doit contenir les derivees pures
- `effect()` ne sert pas a recalculer du state metier
- les Signals evitent qu un state derive oublie d etre rafraichi apres une action utilisateur

## Criteres de validation

- au moins deux valeurs sources sont gerees avec `signal()`
- la liste filtree est derivee avec `computed()`
- les compteurs sont derives avec `computed()`
- le titre de page est synchronise par un `effect()`
- le bouton de reinitialisation ne laisse plus de state incoherent

## Ressources officielles

- Signals: [https://angular.dev/guide/signals](https://angular.dev/guide/signals)
