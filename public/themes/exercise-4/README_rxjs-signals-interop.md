# Exercice 4 - Interop RxJS et Signals

## Contexte

Une equipe venant d Angular 16 ne va pas abandonner RxJS du jour au lendemain.
Et ce ne serait pas une bonne idee.

Le bon sujet n est donc pas:

> Est-ce qu on remplace RxJS par Signals ?

Le bon sujet est:

> Comment faire cohabiter RxJS et Signals proprement ?

## Promise, Observable, Signal : trois roles differents

### Promise

Une Promise represente en general un resultat unique a venir.

```ts
async function loadUser(): Promise<User> {
  const response = await fetch('/api/user');
  return response.json();
}
```

Ce que cela signifie:

- l operation se resout une seule fois
- on obtient une valeur finale unique
- la Promise ne represente pas un flux continu

### Observable

Un Observable represente un flux de valeurs dans le temps.

```ts
readonly query$ = new BehaviorSubject('');

readonly filteredProducts$ = combineLatest([
  this.products$,
  this.query$
]).pipe(
  map(([products, query]) =>
    products.filter((product) => product.name.includes(query))
  )
);
```

Ce que cela signifie:

- il peut y avoir plusieurs emissions
- on peut combiner plusieurs flux
- chaque nouvelle emission peut recalculer le resultat

### Signal

Un Signal represente une valeur reactive courante.

```ts
readonly query = signal('');

readonly filteredProducts = computed(() =>
  this.products().filter((product) => product.name.includes(this.query()))
);
```

Ce que cela signifie:

- on lit directement la valeur courante
- on derive facilement des valeurs d affichage
- le template Angular peut consommer cette valeur tres simplement

### Resume simple

- `Promise` = une valeur unique plus tard
- `Observable` = plusieurs valeurs dans le temps
- `Signal` = la valeur courante reactive

Le bon raisonnement n est pas de choisir un vainqueur.
Le bon raisonnement est de choisir l outil adapte au probleme traite.

## Pourquoi Angular a ajoute une interop officielle

Angular sait tres bien qu un projet moderne contient souvent:

- des services historiques en RxJS
- des composants recents qui beneficieraient de Signals

L interop officielle permet de relier ces deux mondes sans bricolage.

## Ce qu on faisait avant

Avant, le composant pouvait rester 100% RxJS:

```ts
readonly filteredProducts$ = combineLatest([
  this.productStream$,
  this.query$
]).pipe(
  map(([products, query]) => filterProducts(products, query))
);
```

Cette approche est correcte.
Mais pour une simple UI de filtre, elle peut devenir verbeuse cote composant.

## Ce qu on fait maintenant

Angular fournit `toSignal()` pour transformer un `Observable` en valeur reactive courante lisible dans le composant.

```ts
readonly products = toSignal(this.productService.products$, {
  initialValue: []
});

readonly query = signal('');

readonly filteredProducts = computed(() => {
  return this.products().filter((product) =>
    product.name.toLowerCase().includes(this.query().toLowerCase())
  );
});
```

Ce qu il faut bien comprendre:

- le service reste en RxJS
- le composant consomme ensuite une valeur courante avec `toSignal()`
- les derivees d affichage deviennent plus simples avec `computed()`

## Architecture de l exercice

- `Exercise4` : le parent de page
- `Exercise4Sandbox` : une consommation RxJS classique
- `Exercise4Result` : la meme logique lue via `toSignal()`

## Mission

Votre objectif est de partir d un flux RxJS existant et de:

1. le convertir en signal avec `toSignal()`
2. l afficher dans le template
3. faire le filtre local avec `computed()`
4. comparer ce qui reste un flux et ce qui devient une valeur courante

## Ce que l equipe doit comprendre a la fin

- pourquoi RxJS reste utile
- pourquoi un signal peut simplifier la consommation d un flux dans un composant
- pourquoi Promise, Observable et Signal ne sont pas interchangeables
- pourquoi `toSignal()` ne remplace pas le service RxJS, mais facilite la couche composant

## Criteres de validation

- un Observable est converti avec `toSignal()`
- le template lit une valeur issue de cette conversion
- un `computed()` derive la liste filtree
- l equipe est capable d expliquer pourquoi le flux source reste un Observable

## Ressources officielles

- RxJS interop with signals: [https://angular.dev/ecosystem/rxjs-interop](https://angular.dev/ecosystem/rxjs-interop)
- `toSignal`: [https://angular.dev/api/core/rxjs-interop/toSignal](https://angular.dev/api/core/rxjs-interop/toSignal)
- Signals guide: [https://angular.dev/guide/signals](https://angular.dev/guide/signals)
