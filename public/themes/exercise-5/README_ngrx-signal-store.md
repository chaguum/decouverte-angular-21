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

Avant, on melangeait facilement tout dans le meme service ou le meme composant:

```ts
readonly products = signal<Product[]>([]);
readonly favoriteIds = signal<number[]>([]);
readonly loading = signal(false);
readonly errorMessage = signal<string | null>(null);

async loadProducts(): Promise<void> {
  this.loading.set(true);

  try {
    this.products.set(await fetchProducts());
  } finally {
    this.loading.set(false);
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
withMethods((store) => ({
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

Le point cle du store final est la garde anti rechargement:

```ts
async loadProducts() {
  if (store.entities().length > 0) {
    return;
  }

  // sinon seulement on charge
}
```

Cette petite condition explique tres bien l interet du state partage:

- si les produits sont deja en memoire, on les reutilise
- si l utilisateur change de page puis revient, on evite un nouvel appel
- les composants deviennent des consommateurs du store, pas des mini orchestrateurs chacun dans leur coin

## Architecture de l exercice

- `Exercise5Sandbox` est encore branche sur un service local
- `src/app/exercice/exercise-5/components/exercise-5-sandbox/exercise-5-products.service.ts`
  montre le point de depart
- `src/app/exercice/exercise-5/exercise-5-products.store.ts`
  est le fichier starter a completer
- `Exercise5Result`
  montre la correction finale
- `src/app/exercice/exercise-5/components/exercise-5-result/store.ts`
  contient la version complete du store

## Mission

1. Observer le service de depart dans `components/exercise-5-sandbox/exercise-5-products.service.ts`.
2. Ouvrir `src/app/exercice/exercise-5/exercise-5-products.store.ts`.
3. Ajouter `withEntities()` pour porter la collection de produits.
4. Completer les derivees dans `withComputed`.
5. Completer `loadProducts()`, `reloadProducts()` et `simulateErrorReload()`.
6. Garder `toggleFavorite()` et `setFilter()` dans `withMethods`.
7. Utiliser `withHooks` pour lancer le chargement initial.
8. Garder un statut explicite avec `withStatus()`.
9. Rebrancher ensuite le composant sandbox sur le store au lieu du service.
10. Eviter un rechargement si les produits existent deja dans le store.

## Ce que l equipe doit comprendre a la fin

- `withEntities()` porte proprement une collection metier
- `withState()` decrit le state brut
- `withComputed()` porte les derivees
- `withMethods()` porte les intentions
- `withHooks()` gere le cycle de vie
- `withStatus()` rend visible le cycle de chargement
- le benefice principal est aussi la reutilisation d un state deja charge a l echelle de l application

## Criteres de validation

- le store utilise `withEntities`, `withState`, `withComputed`, `withMethods` et `withHooks`
- un statut explicite `idle / pending / fulfilled / error` est visible
- le composant consomme le store au lieu de porter toute la logique
- la navigation dans l application ne force pas un nouveau chargement si les donnees existent deja

## Ressources officielles

- Guide Signal Store: [https://ngrx.io/guide/signals/signal-store](https://ngrx.io/guide/signals/signal-store)
- API `signalStore`: [https://ngrx.io/api/signals/signalStore](https://ngrx.io/api/signals/signalStore)
- API `withState`: [https://ngrx.io/api/signals/withState](https://ngrx.io/api/signals/withState)
- API `withEntities`: [https://ngrx.io/api/signals/entities/withEntities](https://ngrx.io/api/signals/entities/withEntities)
- API `withComputed`: [https://ngrx.io/api/signals/withComputed](https://ngrx.io/api/signals/withComputed)
- API `withMethods`: [https://ngrx.io/api/signals/withMethods](https://ngrx.io/api/signals/withMethods)
- API `withHooks`: [https://ngrx.io/api/signals/withHooks](https://ngrx.io/api/signals/withHooks)
