# Exercice 5 - NgRx Signal Store

## Contexte

Dans beaucoup d applications Angular, plusieurs pages ont besoin des memes donnees:

- un catalogue de produits
- une liste de favoris
- un filtre courant
- un statut de chargement

Si chaque composant recharge ses donnees dans son coin, on duplique vite:

- les appels reseau
- la logique metier
- les derivees
- le suivi des erreurs

L objectif de cet exercice est donc simple:
**centraliser un etat partage dans un NgRx Signal Store**.

Dans cette version de l atelier, on ajoute aussi `withEntities()` pour modeliser la
collection de produits avec les utilitaires NgRx dedies.

## Ce que l exercice veut vous faire comprendre

Le gain principal n est pas seulement syntaxique.

Un store applicatif `providedIn: 'root'` vit tant que votre SPA tourne.
Cela veut dire que:

- si vous chargez les produits une premiere fois, ils restent en memoire
- si vous changez de page puis revenez, vous retrouvez vos donnees
- vous pouvez eviter un nouvel appel reseau si le store est deja hydrate

Autrement dit:
**on ne recharge pas inutilement ce qu on possede deja en memoire**.

Important:
ce n est pas une persistance disque.
Si vous rechargez completement l onglet du navigateur, l etat repart de zero.

## Ce qu on faisait souvent avant

On avait souvent un service ou un composant qui melangeait tout:

```ts
readonly products = signal<Product[]>([]);
readonly favoriteIds = signal<number[]>([]);
readonly loading = signal(false);
readonly errorMessage = signal<string | null>(null);

readonly visibleProducts = computed(() => {
  return this.products().filter((product) => product.available);
});

async loadProducts(): Promise<void> {
  this.loading.set(true);
  this.errorMessage.set(null);

  try {
    const products = await fetchProducts();
    this.products.set(products);
  } catch (error) {
    this.errorMessage.set('Chargement impossible.');
  } finally {
    this.loading.set(false);
  }
}
```

Ce code peut marcher, mais il finit vite par regrouper dans le meme endroit:

- l etat brut
- les derivees
- les actions
- le cycle de vie
- le statut de chargement

## Ce qu on fait ici avec Signal Store

Avec NgRx Signal Store, on se force a separer les responsabilites.

### 1. `withEntities`

Quand votre store porte une vraie collection metier, `withEntities()` est souvent plus
interessant qu un simple tableau dans `withState`.

```ts
withEntities<Product>()
```

Cette feature ajoute notamment:

- `entityMap`
- `ids`
- `entities`

et vous permet ensuite d utiliser des updaters comme `setAllEntities()`.

Exemple de chargement:

```ts
patchState(
  store,
  setAllEntities(products),
  {
    status: 'fulfilled',
    errorMessage: null
  }
);
```

Dans cet exercice, cela permet de bien montrer la difference entre:

- la collection metier de produits
- le reste du state applicatif comme le filtre, les favoris ou le statut

### 2. `withState`

`withState` decrit ce que le store possede.

```ts
withState({
  favoriteIds: [] as number[],
  filter: 'all' as ProductFilter,
  requestCount: 0,
  lastLoadedAt: null as string | null
})
```

Ici, on parle uniquement de l etat brut.
Pas de derivees. Pas d action. Pas de logique de chargement.

### 3. `withComputed`

`withComputed` decrit ce que le store deduit de son etat.

```ts
withComputed((store) => ({
  favoriteCount: computed(() => store.favoriteIds().length),
  visibleProducts: computed(() => {
    if (store.filter() === 'favorites') {
      return store.entities().filter((product) =>
        store.favoriteIds().includes(product.id)
      );
    }

    return store.entities();
  })
}))
```

Ici, on ne modifie rien.
On derive simplement de nouvelles valeurs a partir du state.

### 4. `withMethods`

`withMethods` porte les intentions metier.

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

On lit tres bien ce que le store sait faire:

- charger
- recharger
- changer le filtre
- ajouter ou retirer un favori

### 5. `withHooks`

`withHooks` permet de decrire le cycle de vie du store.

```ts
withHooks({
  onInit(store) {
    void store.loadProducts();
  }
})
```

Dans cet exercice, le premier chargement part automatiquement quand le store est initialise.

### 6. `withStatus`

Dans cet atelier, on ajoute une petite feature locale `withStatus()`.
Le but est de modeliser explicitement:

- `idle`
- `pending`
- `fulfilled`
- `error`

Exemple simplifie:

```ts
export function withStatus() {
  return signalStoreFeature(
    withState({
      status: 'idle' as LoadStatus,
      errorMessage: null as string | null
    }),
    withComputed(({ status }) => ({
      isPending: computed(() => status() === 'pending'),
      isFulfilled: computed(() => status() === 'fulfilled')
    }))
  );
}
```

L interet est pedagogique:
on evite de disperser des booleens comme `loading`, `loaded`, `hasError` un peu partout.

## Le point cle de l exercice

La methode de chargement du resultat attendu contient une garde tres importante:

```ts
async loadProducts() {
  if (store.entities().length > 0) {
    patchState(store, {
      status: 'fulfilled',
      errorMessage: null
    });
    return;
  }

  // sinon seulement on lance l appel
}
```

Cette garde montre pourquoi un store partage est utile:

- si les produits sont deja charges, on les reutilise
- si l utilisateur navigue puis revient, on n appelle pas a nouveau l API
- les composants deviennent de simples consommateurs du store

Dans la sandbox, tout vit dans le composant.
Quand le composant est detruit, l etat disparait avec lui.

Dans le resultat attendu, le store vit au niveau applicatif.

## Architecture de l exercice

- `Exercise5Sandbox`
  est encore branche sur un service local
- `src/app/exercice/exercise-5/components/exercise-5-sandbox/exercise-5-products.service.ts`
  montre le point de depart a migrer
- `src/app/exercice/exercise-5/exercise-5-products.store.ts`
  est le fichier store que les developpeurs doivent completer
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

## Ce qu il faut retenir

- `withEntities` = une collection metier geree proprement
- `withState` = le reste de l etat brut
- `withComputed` = ce que le store deduit
- `withMethods` = ce que le store fait
- `withHooks` = quand il agit dans son cycle de vie
- `withStatus` = comment on rend visible le cycle de chargement

Le vrai benefice n est pas uniquement la proprete du code.
Le vrai benefice, c est aussi la **reutilisation d un etat deja charge a l echelle de l application**.

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
