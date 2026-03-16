# Exercice 3 - Signals

## Contexte

Les Signals sont probablement le changement de modele mental le plus important pour une equipe qui vient d Angular 16.

Le point cle a faire comprendre est le suivant:
le gain principal n est pas "le template se met a jour".
Avec Angular, un template se mettait deja a jour avec des proprietes classiques.

Le vrai gain est ailleurs:

- la source de verite devient explicite
- les derivees sont calculees automatiquement
- les effets de bord sont isoles
- on reduit les oublis de synchronisation

## Ce que ca change

Angular distingue maintenant beaucoup mieux:

- la valeur source avec `signal()`
- la valeur derivee avec `computed()`
- l effet de bord avec `effect()`

Cette separation rend le composant plus facile a lire et plus facile a maintenir.

## Qu est-ce qu un signal ?

Un signal est une valeur reactive courante.

Concretement:

- on peut la lire immediatement
- on peut la mettre a jour
- Angular sait qui depend de cette valeur
- quand elle change, les derivees et le template se remettent a jour

Exemple simple:

```ts
readonly count = signal(0);
```

Lire la valeur:

```ts
console.log(this.count());
```

Modifier la valeur:

```ts
this.count.set(1);
this.count.update((value) => value + 1);
```

Autres declarations classiques:

```ts
readonly searchTerm = signal('');
readonly isLoading = signal(false);
readonly selectedCategory = signal<'all' | 'hardware' | 'software'>('all');
```

## Qu est-ce qu un `computed()` ?

Un `computed()` sert a produire une valeur derivee.

Il ne cree pas une nouvelle source de verite.
Il calcule une valeur a partir d autres signals.

Exemple simple:

```ts
readonly count = signal(2);
readonly doubled = computed(() => this.count() * 2);
```

Autre exemple:

```ts
readonly firstName = signal('Ada');
readonly lastName = signal('Lovelace');
readonly fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

Et un exemple tres concret:

```ts
readonly price = signal(100);
readonly quantity = signal(2);
readonly total = computed(() => this.price() * this.quantity());
```

Si `quantity` passe a `3`, alors `total()` vaut automatiquement `300`.

## Qu est-ce qu un `effect()` ?

Un `effect()` sert a declarer un effet de bord.

Un effet de bord, c est une action qui ne produit pas une nouvelle valeur metier, mais qui synchronise quelque chose a l exterieur:

- un log
- le titre de la page
- du stockage local
- une API imperative

Exemple simple:

```ts
readonly count = signal(0);

constructor() {
  effect(() => {
    console.log(`Compteur courant: ${this.count()}`);
  });
}
```

Autre exemple utile:

```ts
readonly pageTitle = computed(() => `Panier (${this.items().length})`);

constructor() {
  effect(() => {
    document.title = this.pageTitle();
  });
}
```

Ici, `pageTitle` est une derivee.
L `effect()` ne fait que la refleter dans le navigateur.

## La regle simple a retenir

- `signal()` = je stocke une source de verite
- `computed()` = je derive une nouvelle valeur
- `effect()` = je synchronise un effet externe

## Ce qu on faisait avant

Avant, on ecrivait souvent quelque chose comme ceci:

```ts
searchTerm = '';
selectedCategory = 'all';
filteredProducts: Product[] = [];
resultsCount = 0;
pageTitle = 'Catalogue';

refreshViewModel(): void {
  this.filteredProducts = this.products.filter((product) => {
    return this.selectedCategory === 'all' || product.category === this.selectedCategory;
  });

  this.resultsCount = this.filteredProducts.length;
  this.pageTitle = `Catalogue (${this.resultsCount})`;
}
```

Ce code peut marcher, mais il a un defaut classique:
il faut penser a relancer les recalculs manuellement au bon moment.

## Ce qu on fait maintenant

```ts
readonly searchTerm = signal('');
readonly selectedCategory = signal('all');

readonly filteredProducts = computed(() => {
  const query = this.searchTerm().trim().toLowerCase();
  const category = this.selectedCategory();

  return this.products.filter((product) => {
    const matchesQuery = query.length === 0 || product.name.toLowerCase().includes(query);
    const matchesCategory = category === 'all' || product.category === category;
    return matchesQuery && matchesCategory;
  });
});

readonly resultsCount = computed(() => this.filteredProducts().length);
readonly pageTitle = computed(() => `Catalogue (${this.resultsCount()})`);

constructor() {
  effect(() => {
    document.title = this.pageTitle();
  });
}
```

## Ce que l exercice veut faire sentir

Dans la sandbox, certaines derivees sont recalculees a la main.
La correction montre une autre logique:

- les valeurs sources sont en `signal()`
- les derivees sont en `computed()`
- le titre de page est synchronise par `effect()`

Le message pedagogique est simple:
si une valeur est derivee d autres valeurs, elle ne devrait pas etre recalculee a la main partout.

## Exemple a eviter

```ts
effect(() => {
  this.total.set(this.price() * this.quantity());
});
```

Ici, `total` devrait etre un `computed()`, pas un `signal()` mis a jour par effet.

## Architecture de l exercice

- `Exercise3` : le parent de page
- `Exercise3Sandbox` : la version classique
- `Exercise3Result` : la version Signals

## Mission

Votre objectif est de transformer la sandbox sans changer le comportement utilisateur.

Ce que vous devez faire:

1. convertir les valeurs sources en `signal()`
2. remplacer les recalculs manuels par des `computed()`
3. creer les derivees d affichage avec `computed()`
4. utiliser un `effect()` pour synchroniser le titre de page
5. verifier que le reset ne desynchronise plus l interface

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
