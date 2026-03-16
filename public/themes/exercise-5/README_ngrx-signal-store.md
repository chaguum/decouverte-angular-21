# Exercice 5 - NgRx Signal Store

## Contexte

Quand plusieurs ecrans ont besoin des memes donnees, le simple state local de composant ne suffit plus.

Dans cet atelier, nous voulons faire comprendre un point tres concret:
si une application a deja charge des donnees utiles, elle ne devrait pas les recharger inutilement a chaque navigation.

C est exactement le terrain ideal pour un store partage.

## Pourquoi ce sujet est important

Le gain principal n est pas seulement syntaxique.
Le vrai gain est architectural.

Avec un store applicatif `providedIn: 'root'`:

- les donnees restent en memoire tant que la SPA tourne
- plusieurs composants peuvent consommer le meme state
- on evite des appels reseau redondants
- on separe mieux les responsabilites

Important:
cela ne veut pas dire persistance disque.
Si l utilisateur recharge completement l onglet navigateur, le state repart de zero.

## Ce qu on faisait souvent avant

Avant, on gardait souvent l etat local dans le composant, avec un appel direct au service:

```ts
export class ProductsPageComponent {
  private readonly productsService = inject(Exercise5ProductsService);

  readonly products = signal<Product[]>([]);
  readonly favoriteIds = signal<number[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  async loadProducts(): Promise<void> {
    this.loading.set(true);

    try {
      this.products.set(await this.productsService.loadProducts());
    } finally {
      this.loading.set(false);
    }
  }
}
```

Ce type de code peut fonctionner, mais il finit vite par rassembler:

- l etat brut
- les derivees
- les actions
- le cycle de vie
- le statut de chargement

## Ce qu on fait ici avec Signal Store

NgRx Signal Store pousse une separation beaucoup plus claire.

### `withEntities()`

Quand un store porte une vraie collection metier, `withEntities()` est souvent plus adapte qu un simple tableau.

```ts
withEntities<Product>()
```

Cette feature ajoute notamment:

- `entities`
- `entityMap`
- `ids`

Elle permet ensuite d utiliser des helpers comme `setAllEntities()`.

### `withState()`

`withState()` sert a declarer l etat brut du store.

```ts
withState({
  favoriteIds: [] as number[],
  filter: 'all' as ProductFilter,
  lastLoadedAt: null as string | null
})
```

### `withComputed()`

`withComputed()` sert a declarer les derivees.

```ts
withComputed((store) => ({
  favoriteCount: computed(() => store.favoriteIds().length)
}))
```

### `withMethods()`

`withMethods()` porte les intentions metier.

```ts
withMethods((store, productService = inject(ProductService)) => ({
  async loadProducts() {
    if (store.entities().length > 0) {
      return;
    }

    const products = await productService.loadProducts();
    patchState(store, setAllEntities(products));
  },
  toggleFavorite(productId: number) {
    const isFavorite = store.favoriteIds().includes(productId);

    patchState(store, {
      favoriteIds: isFavorite
        ? store.favoriteIds().filter((id) => id !== productId)
        : [...store.favoriteIds(), productId]
    });
  }
}))
```

### `withHooks()`

`withHooks()` sert a decrire le cycle de vie du store.

```ts
withHooks({
  onInit(store) {
    void store.loadProducts();
  }
})
```

### `withStatus()`

Dans cet atelier, on ajoute aussi une feature locale `withStatus()` pour rendre visible le cycle:

- `idle`
- `pending`
- `fulfilled`
- `error`

Le but pedagogique est simple:
eviter des booleens disperses comme `loading`, `loaded`, `hasError`.

## L idee la plus importante de l exercice

Le vrai changement a observer est celui-ci:

- avant, le composant injecte `Exercise5ProductsService` et orchestre lui-meme `loadProducts()`
- apres, le store injecte ce meme service et porte la logique a la place du composant

Autrement dit:

- le service ne disparait pas
- il reste responsable de l acces aux donnees
- le store devient responsable du state partage et des derivees
- le composant, lui, devient beaucoup plus simple a lire

## Architecture de l exercice

- `Exercise5Sandbox`
  montre le point de depart
- `src/app/exercice/exercise-5/components/exercise-5-sandbox/exercise-5-sandbox.ts`
  montre la version ou le composant injecte directement le service et porte tout le state local
- `src/app/exercice/exercise-5/components/exercise-5-sandbox/exercise-5-products.store.ts`
  est le fichier starter a completer
- `src/app/exercice/exercise-5/exercise-5-products.service.ts`
  est le service unique partage entre la sandbox et la correction
- `Exercise5Result`
  montre la correction finale
- `src/app/exercice/exercise-5/components/exercise-5-result/store.ts`
  contient la version complete du store

## Mission

1. Observer le composant de depart dans `components/exercise-5-sandbox/exercise-5-sandbox.ts`.
2. Ouvrir `src/app/exercice/exercise-5/components/exercise-5-sandbox/exercise-5-products.store.ts`.
3. Ajouter `withEntities()` pour porter la collection de produits.
4. Completer les derivees dans `withComputed`.
5. Completer `loadProducts()` dans `withMethods` avec l injection du service de chargement.
6. Garder `toggleFavorite()` et `setFilter()` dans `withMethods`.
7. Completer `clearStore()` pour remettre aussi la collection a zero.
8. Utiliser `withHooks` pour lancer le chargement initial.
9. Garder un statut explicite avec `withStatus()`.
10. Rebrancher ensuite le composant sandbox sur le store au lieu du service.

## Ce que l equipe doit comprendre a la fin

- `withEntities()` porte proprement une collection metier
- `withState()` decrit le state brut
- `withComputed()` porte les derivees
- `withMethods()` porte les intentions
- `withHooks()` gere le cycle de vie
- `withStatus()` rend visible le cycle de chargement
- le composant n a plus a porter toute la logique de chargement
- un meme service de donnees peut etre appele soit par un composant legacy, soit par un store moderne

## Criteres de validation

- le store utilise `withEntities`, `withState`, `withComputed`, `withMethods` et `withHooks`
- un statut explicite `idle / pending / fulfilled / error` est visible
- le composant consomme le store au lieu de porter toute la logique

## Ressources officielles

- Guide Signal Store: [https://ngrx.io/guide/signals/signal-store](https://ngrx.io/guide/signals/signal-store)
- API `signalStore`: [https://ngrx.io/api/signals/signalStore](https://ngrx.io/api/signals/signalStore)
- API `withState`: [https://ngrx.io/api/signals/withState](https://ngrx.io/api/signals/withState)
- API `withEntities`: [https://ngrx.io/api/signals/entities/withEntities](https://ngrx.io/api/signals/entities/withEntities)
- API `withComputed`: [https://ngrx.io/api/signals/withComputed](https://ngrx.io/api/signals/withComputed)
- API `withMethods`: [https://ngrx.io/api/signals/withMethods](https://ngrx.io/api/signals/withMethods)
- API `withHooks`: [https://ngrx.io/api/signals/withHooks](https://ngrx.io/api/signals/withHooks)
