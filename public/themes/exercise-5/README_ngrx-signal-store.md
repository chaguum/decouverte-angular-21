# Exercice 5 - NgRx Signal Store

## Contexte

Dans vos projets, vous utilisez deja NgRx Signal Store.
Cet exercice ne sert donc pas a decouvrir NgRx "au sens large", mais a clarifier la structure
d un store moderne base sur les signals.

Le plus important ici est de comprendre le role de chaque brique:

- `withState`
- `withComputed`
- `withMethods`
- `withHooks`
- `withStatus`

Si ces briques sont bien separees, le store devient tres lisible.
Si elles sont melangees, on retombe vite dans un simple service avec un peu de syntaxe moderne.

## Pourquoi ce sujet est important

Quand on vient d une culture Angular 16 + RxJS, on peut tres facilement reconstruire un store
signal comme un service classique:

- un state brut
- quelques methodes
- quelques derivees
- beaucoup de responsabilites dans le meme bloc

Ce serait dommage.

NgRx Signal Store propose justement une structure plus nette:

- l etat brut
- les derivees
- les actions
- les hooks de cycle de vie
- le statut de chargement

Le vrai gain pedagogique de cet exercice, c est donc la **structure**.

## Ce qu on faisait avant

Avant Signal Store, un service de state ressemblait souvent a cela:

```ts
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly favorites = signal<Product[]>([]);
  private readonly loading = signal(false);

  readonly count = computed(() => this.favorites().length);

  load(): void {
    this.loading.set(true);
    // appel HTTP puis mise a jour manuelle
  }

  add(product: Product): void {
    this.favorites.update((items) => [...items, product]);
  }
}
```

Ce code peut fonctionner, mais il melange vite:

- la donnees brute
- les derivees
- les actions
- le cycle de vie

## Ce qu on fait maintenant

Avec Signal Store, on explicite chaque responsabilite.

Exemple tres simple:

```ts
export const FavoritesStore = signalStore(
  withState({
    favorites: [] as Product[]
  }),
  withComputed((store) => ({
    count: computed(() => store.favorites().length)
  })),
  withMethods((store) => ({
    add(product: Product) {
      patchState(store, {
        favorites: [...store.favorites(), product]
      });
    }
  }))
);
```

Ici, la lecture est beaucoup plus claire:

- `withState` = ce que le store possede
- `withComputed` = ce qu il deduit
- `withMethods` = ce qu il fait

## Comment lire un Signal Store

### `withState`

C est l etat brut du store.
Ce que le store possede.

```ts
withState({
  favorites: [] as Product[],
  selectedCategory: 'all' as CategoryFilter
})
```

### `withComputed`

Ce sont les derivees.
Ce que le store deduit a partir de l etat.

```ts
withComputed((store) => ({
  count: computed(() => store.favorites().length),
  filteredFavorites: computed(() =>
    store.selectedCategory() === 'all'
      ? store.favorites()
      : store.favorites().filter((item) => item.category === store.selectedCategory())
  )
}))
```

### `withMethods`

Ce sont les actions ou intentions metier.
Ce que le store fait.

```ts
withMethods((store) => ({
  add(product: Product) {
    patchState(store, {
      favorites: [...store.favorites(), product]
    });
  },
  remove(productId: number) {
    patchState(store, {
      favorites: store.favorites().filter((item) => item.id !== productId)
    });
  }
}))
```

### `withHooks`

Ce sont les reactions au cycle de vie du store.

```ts
withHooks({
  onInit(store) {
    store.loadFavorites();
  }
})
```

### `withStatus`

Cette brique permet de modeliser proprement un statut de chargement.
C est utile pour eviter les booleens disperses comme `isLoading`, `hasError`, `isLoaded`.

L idee pedagogique a retenir:
le statut fait partie du modele de state, il ne doit pas vivre "a cote" du store.

## Architecture de l exercice

- `Exercise5` sert de parent de page
- la sandbox montrera un point de depart peu structure
- le resultat attendu montrera un petit Signal Store bien decoupe

Le cas d usage ideal pour ce TP:
un mini store de favoris, de taches ou de produits sauvegardes.

## Mission

Construire un tout petit store de favoris:

1. un tableau de favoris dans `withState`
2. un compteur dans `withComputed`
3. une action `add` et une action `remove` dans `withMethods`
4. une initialisation simple dans `withHooks`
5. un statut de chargement gere proprement avec `withStatus`

L exercice doit rester volontairement petit.
On veut comprendre la structure, pas passer 30 minutes sur un cas metier.

## Ce que l equipe doit comprendre a la fin

- comment decouper proprement un Signal Store
- pourquoi `withState`, `withComputed` et `withMethods` ne doivent pas etre melanges
- pourquoi `withHooks` rend l initialisation plus lisible
- pourquoi un statut de chargement propre evite les booleens eparpilles

## Criteres de validation

- le store utilise clairement `withState`
- une derivee est definie dans `withComputed`
- au moins une action est definie dans `withMethods`
- `withHooks` sert a l initialisation
- le chargement n est pas gere avec des booleens disperses

## Ressources officielles

- Guide Signal Store: [https://ngrx.io/guide/signals/signal-store](https://ngrx.io/guide/signals/signal-store)
- API `withState`: [https://ngrx.io/api/signals/withState](https://ngrx.io/api/signals/withState)
- API `withComputed`: [https://ngrx.io/api/signals/withComputed](https://ngrx.io/api/signals/withComputed)
- API `withMethods`: [https://ngrx.io/api/signals/withMethods](https://ngrx.io/api/signals/withMethods)
- API `withHooks`: [https://ngrx.io/api/signals/withHooks](https://ngrx.io/api/signals/withHooks)
