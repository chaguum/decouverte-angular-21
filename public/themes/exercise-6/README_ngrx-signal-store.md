# Exercice 6 - NgRx Signal Store

## Contexte

Dans vos projets, vous utilisez deja NgRx Signal Store.
Cet exercice ne sert donc pas a "decouvrir NgRx" au sens large, mais a mettre de l ordre dans les
concepts modernes du store signal.

Le plus important ici est de comprendre le role de chaque brique:
- `withState`
- `withComputed`
- `withMethods`
- `withHooks`
- `withStatus`

## Pourquoi ce sujet compte vraiment ?

Quand on vient d une culture Angular 16 + RxJS, on peut vite reconstruire un store signal
comme un service classique un peu plus moderne.

Ce serait dommage.

Signal Store propose justement une facon plus claire de separer:
- les donnees
- les valeurs derivees
- les actions
- le cycle de vie

En tant qu enseignant, je dirais que c est le vrai enjeu de cet exercice:
apprendre a structurer le store, pas seulement a le faire fonctionner.

## Comment lire un Signal Store

### `withState`

C est l etat brut du store.
Ce que le store "possede".

### `withComputed`

Ce sont les derivees de l etat.
Ce que le store "deduit".

### `withMethods`

Ce sont les intentions metier.
Ce que le store "fait".

### `withHooks`

Ce sont les reactions au cycle de vie.
Ce que le store "initialise" ou "nettoie".

### `withStatus`

C est une facon pratique de modeliser les etats de chargement.
Tres utile pour eviter les booleens eparpilles.

## Mission

Construire un tout petit store de favoris ou de taches:
- un tableau dans `withState`
- un compteur ou un filtre dans `withComputed`
- une ou deux actions dans `withMethods`
- une initialisation dans `withHooks`
- un statut de chargement simple avec `withStatus`

L exercice doit rester tres petit:
on veut comprendre la structure, pas passer 30 minutes sur un cas metier.

## Ce que vous devez comprendre a la fin

- comment decouper proprement un store signal
- pourquoi il faut eviter de melanger etat, derivees et actions
- pourquoi Signal Store est plus agreable a lire quand chaque brique a un role clair

## Criteres de validation

- le store utilise clairement `withState`, `withComputed` et `withMethods`
- `withHooks` est utilise pour l initialisation
- l etat de chargement n est pas gere avec des booleens disperses

## Ressources officielles

- Guide Signal Store: [https://ngrx.io/guide/signals/signal-store](https://ngrx.io/guide/signals/signal-store)
- API `withState`: [https://ngrx.io/api/signals/withState](https://ngrx.io/api/signals/withState)
- API `withComputed`: [https://ngrx.io/api/signals/withComputed](https://ngrx.io/api/signals/withComputed)
- API `withMethods`: [https://ngrx.io/api/signals/withMethods](https://ngrx.io/api/signals/withMethods)
- API `withHooks`: [https://ngrx.io/api/signals/withHooks](https://ngrx.io/api/signals/withHooks)

