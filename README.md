# Decouverte Angular 21

Support de presentation V1 pour une demi-journee d atelier destinee a une equipe habituee a Angular 16.

Le but de ce projet n est pas de montrer tout Angular 21.
Le but est de faire decouvrir, rapidement et concretement, les evolutions qui changent vraiment la facon de coder au quotidien.

## Objectif pedagogique

A la fin de l atelier, l equipe doit avoir compris:

- pourquoi Angular pousse une ecriture plus locale et plus explicite
- comment les templates ont evolue
- comment les Signals changent la gestion du state local
- comment faire cohabiter RxJS et Signals
- comment structurer un state partage avec NgRx Signal Store
- ce que Signal Forms apporte, et pourquoi il faut encore rester prudent

## Programme de l atelier

1. Exercice 1 : Standalone
2. Exercice 2 : Controle de flux et `@let`
3. Exercice 3 : Signals
4. Exercice 3.5 : Signals et `input` / `output`
5. Exercice 4 : Interop RxJS et Signals
6. Exercice 5 : NgRx Signal Store
7. Exercice 6 : Signal Forms

## Philosophie generale

Chaque sujet suit le meme format:

- une sandbox qui montre un point de depart
- un resultat attendu qui montre la version moderne
- un README dedie dans `public/themes/exercise-X/`

L idee n est pas de faire des exercices longs.
L idee est de faire des micro-exercices de 10 a 15 minutes qui isolent une seule notion.

---

## Exercice 1 : Standalone

### Pourquoi ce sujet existe

Quand on vient d Angular 16, on pense souvent encore en `NgModule`.
Depuis les versions recentes d Angular, l approche recommandee est beaucoup plus locale:
les composants deviennent autonomes et declarent eux-memes leurs dependances.

### Avant

```ts
@NgModule({
  declarations: [Exercise1Component, MemberProfileCard, MemberSkillList],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
})
export class TeamFeatureModule {}
```

### Maintenant

```ts
@Component({
  standalone: true,
  imports: [FormsModule, MemberProfileCard, MemberSkillList],
  templateUrl: './exercise-1.html'
})
export class Exercise1 {}
```

Et pour le routing:

```ts
{
  path: 'exercise-1',
  loadComponent: () => import('./exercise-1').then((m) => m.Exercise1)
}
```

### Ce qu il faut retenir

- le composant declare directement ce qu il utilise
- on supprime une couche intermediaire purement structurelle
- le lazy loading devient plus direct avec `loadComponent`

### Ressources

- Standalone migration: [https://angular.dev/reference/migrations/standalone](https://angular.dev/reference/migrations/standalone)

---

## Exercice 2 : Controle de flux et `@let`

### Pourquoi ce sujet existe

Angular a introduit une nouvelle ecriture de template:

- `@if`
- `@for`
- `@switch`
- `@let`

Le but n est pas de faire "plus moderne".
Le but est de rendre les templates plus lisibles et plus explicites.

### Avant

```html
<section *ngIf="filteredMovies.length > 0; else emptyState">
  <article *ngFor="let movie of filteredMovies; trackBy: trackByMovieId">
    {{ movie.title }}
  </article>
</section>

<ng-template #emptyState>
  <p>Aucun film trouve.</p>
</ng-template>
```

### Maintenant

```html
@let visibleMovies = filteredMovies();

@if (visibleMovies.length > 0) {
  @for (movie of visibleMovies; track movie.id) {
    <article>{{ movie.title }}</article>
  }
} @else {
  <p>Aucun film trouve.</p>
}
```

### Ce qu il faut retenir

- `@for` rend le `track` tres visible
- `@let` evite les repetitions d expressions
- le template raconte mieux l intention metier

### Ressources

- Control flow: [https://angular.dev/guide/templates/control-flow](https://angular.dev/guide/templates/control-flow)
- Variables en template: [https://angular.dev/guide/templates/variables](https://angular.dev/guide/templates/variables)

---

## Exercice 3 : Signals

### Pourquoi ce sujet existe

Les Signals sont probablement le plus gros changement de modele mental pour une equipe Angular 16.

Le point important a faire comprendre:
le gain principal n est pas "le template se met a jour", parce que des proprietes classiques mettent deja le template a jour.
Le vrai gain est plutot:

- un state source explicite
- des derivees automatiques avec `computed()`
- moins de recalculs manuels oublies
- des effets de bord isoles dans `effect()`

### Avant

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

### Maintenant

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

### Ce qu il faut retenir

- `signal()` = source de verite locale
- `computed()` = derivee pure
- `effect()` = effet de bord

### Ressources

- Signals: [https://angular.dev/guide/signals](https://angular.dev/guide/signals)

---

## Exercice 3.5 : Signals et `input` / `output`

### Pourquoi ce sujet existe

Une fois le state local modernise avec Signals, il faut aussi moderniser la communication entre composants.

Angular pousse aujourd hui:

- `input()`
- `output()`

plutot que:

- `@Input()`
- `@Output()`

### Avant

```ts
@Input() resultsCount = 0;
@Input() pageTitle = '';
@Output() availableOnlyChange = new EventEmitter<boolean>();
```

### Maintenant

```ts
readonly resultsCount = input.required<number>();
readonly pageTitle = input.required<string>();
readonly availableOnlyChange = output<boolean>();
```

### Ce qu il faut retenir

- le parent reste proprietaire du state
- l enfant recoit des donnees via `input()`
- l enfant remonte une intention via `output()`

### Ressources

- Inputs: [https://angular.dev/guide/components/inputs](https://angular.dev/guide/components/inputs)
- Outputs: [https://angular.dev/guide/components/outputs](https://angular.dev/guide/components/outputs)

---

## Exercice 4 : Interop RxJS et Signals

### Pourquoi ce sujet existe

Une equipe Angular 16 a deja beaucoup de RxJS dans le codebase.
La bonne question n est donc pas:

> Est-ce qu on remplace RxJS par Signals ?

La bonne question est:

> Comment faire cohabiter RxJS et Signals proprement ?

### Promise, Observable, Signal

#### Promise

Une Promise represente generalement un resultat unique a venir.

```ts
async function loadUser(): Promise<User> {
  const response = await fetch('/api/user');
  return response.json();
}
```

A retenir:

- une seule resolution
- tres bien pour un appel ponctuel
- pas de notion de flux continu

#### Observable

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

A retenir:

- plusieurs emissions possibles
- tres adapte aux evenements, streams, combinaisons et pipelines
- excellent pour les services et la logique reactive riche

#### Signal

Un Signal represente une valeur courante reactive.

```ts
readonly query = signal('');

readonly filteredProducts = computed(() =>
  this.products().filter((product) => product.name.includes(this.query()))
);
```

A retenir:

- lecture immediate de la valeur courante
- excellent pour le state local et les derivees d affichage
- tres naturel dans un composant Angular

### Avant

```ts
readonly filteredProducts$ = combineLatest([
  this.productStream$,
  this.query$
]).pipe(
  map(([products, query]) => filterProducts(products, query))
);
```

### Maintenant

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

### Ce qu il faut retenir

- le service peut rester en RxJS
- le composant peut consommer une valeur courante via `toSignal()`
- on simplifie la couche UI sans casser le modele existant

### Ressources

- RxJS interop: [https://angular.dev/ecosystem/rxjs-interop](https://angular.dev/ecosystem/rxjs-interop)
- `toSignal()`: [https://angular.dev/ecosystem/rxjs-interop#create-a-signal-from-an-rxjs-observable-with-tosignal](https://angular.dev/ecosystem/rxjs-interop#create-a-signal-from-an-rxjs-observable-with-tosignal)

---

## Exercice 5 : NgRx Signal Store

### Pourquoi ce sujet existe

Quand plusieurs ecrans ont besoin des memes donnees, il faut sortir du simple state local de composant.

Le vrai interet du Signal Store dans cet atelier:

- partager un state entre plusieurs vues
- conserver les donnees tant que la SPA tourne
- eviter de recharger inutilement les memes donnees
- separer proprement l etat, les derivees, les intentions et le cycle de vie

Important:
on parle ici de persistence en memoire dans la session SPA, pas de persistence disque.

### Avant

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

### Maintenant

```ts
export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withEntities<Product>(),
  withState({
    favoriteIds: [] as number[],
    filter: 'all' as ProductFilter
  }),
  withComputed((store) => ({
    favoriteCount: computed(() => store.favoriteIds().length)
  })),
  withMethods((store) => ({
    toggleFavorite(productId: number) {
      const isFavorite = store.favoriteIds().includes(productId);

      patchState(store, {
        favoriteIds: isFavorite
          ? store.favoriteIds().filter((id) => id !== productId)
          : [...store.favoriteIds(), productId]
      });
    }
  })),
  withHooks({
    onInit(store) {
      void store.loadProducts();
    }
  })
);
```

### Vocabulaire cle

- `withEntities()` = collection metier
- `withState()` = etat brut
- `withComputed()` = derivees
- `withMethods()` = intentions metier
- `withHooks()` = cycle de vie
- `withStatus()` = statut de chargement explicite dans notre atelier

### Ce qu il faut retenir

- le store root garde les donnees en memoire tant que l application tourne
- on centralise la logique une fois
- les composants deviennent des consommateurs du store

### Ressources

- Guide Signal Store: [https://ngrx.io/guide/signals/signal-store](https://ngrx.io/guide/signals/signal-store)
- API `withEntities`: [https://ngrx.io/api/signals/entities/withEntities](https://ngrx.io/api/signals/entities/withEntities)
- API `withComputed`: [https://ngrx.io/api/signals/withComputed](https://ngrx.io/api/signals/withComputed)
- API `withMethods`: [https://ngrx.io/api/signals/withMethods](https://ngrx.io/api/signals/withMethods)
- API `withHooks`: [https://ngrx.io/api/signals/withHooks](https://ngrx.io/api/signals/withHooks)

---

## Exercice 6 : Signal Forms

### Pourquoi ce sujet existe

Signal Forms est interessant pedagogiquement, car il montre ou Angular veut aller sur les formulaires.

Point important a dire clairement a l equipe:
la documentation officielle presente encore cette API comme experimentale.

Cela veut dire:

- sujet tres interessant a comprendre
- bonne vision de la direction du framework
- prudence avant generalisation en production

### Avant

```ts
readonly profileForm = new FormGroup({
  name: new FormControl('', { nonNullable: true }),
  email: new FormControl('', { nonNullable: true }),
  role: new FormControl('developer', { nonNullable: true })
});
```

```html
<input [formControl]="profileForm.controls.name" />
<input [formControl]="profileForm.controls.email" />
```

### Maintenant

```ts
readonly profileModel = signal({
  name: '',
  email: '',
  role: 'developer'
});

readonly profileForm = form(this.profileModel, (path) => {
  required(path.name);
  email(path.email);
});
```

```html
<input [formField]="profileForm.name" />
<input [formField]="profileForm.email" />
```

### Ce qu il faut retenir

- on part d un modele pilote par signals
- `form()` construit l arborescence de champs
- les champs et validations deviennent plus explicites

### Ressources

- Signal Forms: [https://angular.dev/essentials/signal-forms](https://angular.dev/essentials/signal-forms)
- Tutorial: [https://angular.dev/tutorials/signal-forms](https://angular.dev/tutorials/signal-forms)

---

## Messages cle a marteler pendant la presentation

### 1. Angular ne remplace pas tout d un coup

Le bon discours n est pas:

- "tout ce qu on faisait avant est mauvais"

Le bon discours est:

- "Angular propose maintenant des APIs plus coherentes entre elles"

### 2. Le vrai fil rouge, c est la clarte

On voit une tendance generale:

- standalone pour rendre les dependances visibles localement
- nouveau control flow pour clarifier les templates
- signals pour clarifier le state local et les derivees
- signal store pour clarifier le state partage

### 3. Tous les sujets n ont pas le meme niveau de maturite

Il faut distinguer:

- ce qui est deja tres etabli
- ce qui est moderne et recommande
- ce qui est encore experimental

Dans cet atelier:

- Standalone, control flow, signals, input/output modernes et RxJS interop sont des sujets centraux
- Signal Forms doit etre presente avec plus de prudence

---

## Utilisation du projet

Lancer le projet:

```bash
ng serve
```

Build:

```bash
ng build
```

Chaque sujet possede:

- une page exercice dans l application
- un README detaille dans `public/themes/`

---

## Liens utiles

- Angular migrations: [https://angular.dev/reference/migrations](https://angular.dev/reference/migrations)
- Angular components: [https://angular.dev/guide/components](https://angular.dev/guide/components)
- Angular signals: [https://angular.dev/guide/signals](https://angular.dev/guide/signals)
- Angular RxJS interop: [https://angular.dev/ecosystem/rxjs-interop](https://angular.dev/ecosystem/rxjs-interop)
- NgRx Signal Store: [https://ngrx.io/guide/signals/signal-store](https://ngrx.io/guide/signals/signal-store)

---

## Suite possible

Cette V1 du README sert de support de presentation global.
La suite logique est de le paufiner ensemble en ajoutant:

- un timing estime par sujet
- des slides plus "oral presentation"
- des schemas simples
- des messages d attention "a ne pas surutiliser"
- des references directes aux fichiers du projet pour chaque demo
