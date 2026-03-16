# Decouverte Angular 21

Support de presentation V2 pour une equipe habituee a Angular 16.

Ce document n est pas pense comme une liste d exercices.
Il est pense comme un **fil conducteur de presentation**, organise en chapitres, pour expliquer:

- ce qui change
- pourquoi Angular pousse ces changements
- quel impact cela a sur notre facon de coder
- dans quels cas ces nouveautes sont vraiment utiles

Les exercices du projet servent ensuite a pratiquer chaque chapitre.

---

## Plan de presentation

1. Le fil rouge des evolutions Angular recentes
2. Chapitre 1 - Simplifier l architecture avec Standalone
3. Chapitre 2 - Moderniser les templates avec `@if`, `@for`, `@switch` et `@let`
4. Chapitre 3 - Repenser le state local avec les Signals
5. Chapitre 4 - Moderniser la communication composant avec `input()` et `output()`
6. Chapitre 5 - Faire cohabiter RxJS et Signals
7. Chapitre 6 - Structurer un state partage avec NgRx Signal Store
8. Chapitre 7 - Ouvrir la discussion sur Signal Forms
9. Conclusion - Ce qu on adopte vite, ce qu on adopte avec prudence

---

## Le fil rouge des evolutions Angular recentes

Quand on regarde Angular 17, 18, 19, 20 puis 21, on voit une direction tres claire.

Angular cherche a rendre le framework:

- plus local
- plus explicite
- plus lisible
- plus reactive

Autrement dit, Angular pousse moins une architecture basee sur:

- des couches implicites
- des modules de structuration
- des derivees recalculees a la main
- des templates un peu verbeux

Et pousse davantage une architecture basee sur:

- des composants autonomes
- des templates plus declaratifs
- un state local clair avec Signals
- une interop officielle avec RxJS
- des APIs plus coherentes entre elles

---

## Chapitre 1 - Simplifier l architecture avec Standalone

### Ce que ca change

Pendant longtemps, Angular etait structure autour des `NgModule`.
Aujourd hui, l approche recommandee est de raisonner d abord en composants autonomes.

Un composant standalone:

- declare lui-meme ses dependances
- peut etre charge directement par le routeur
- reduit le besoin de modules intermediaires

### Impact concret

Pour lire une feature, on a moins besoin d ouvrir plusieurs fichiers juste pour comprendre:

- ou le composant est declare
- de quoi il depend
- comment il est charge

Le code devient plus local et plus explicite.

### Utilite

Standalone est particulierement utile pour:

- les petites features
- les pages lazy loaded
- les composants d interface reutilisables
- les projets ou on veut reduire le boilerplate

### Avant

```ts
@NgModule({
  declarations: [ProfileFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    RouterModule.forChild(routes)
  ]
})
export class TeamFeatureModule {}
```

### Maintenant

```ts
@Component({
  standalone: true,
  imports: [FormsModule, Button, InputText],
  template: `
    <input pInputText [(ngModel)]="fullName" />
    <button pButton type="button" label="Enregistrer"></button>
  `
})
export class ProfileFormComponent {
  fullName = '';
}
```

### Et cote routing avec `loadComponent`

```ts
{
  path: 'exercise-1',
  loadComponent: () =>
    import('./pages/profile-form/profile-form.component').then((m) => m.ProfileFormComponent)
}
```

### Et si on veut garder une route parente avec des enfants

```ts
export const adminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./users-page/users-page.component').then((m) => m.UsersPageComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings-page/settings-page.component').then((m) => m.SettingsPageComponent)
      }
    ]
  }
];

{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes)
}
```

### Message cle

Standalone ne sert pas seulement a ecrire moins de code.
Il sert surtout a rendre les dependances visibles exactement la ou elles sont utilisees.

Dans un projet moderne, cela se voit tres bien avec des bibliotheques UI comme PrimeNG:

- le composant importe lui-meme `Button`, `InputText`, `Select`, etc.
- on voit immediatement de quoi l ecran depend
- il n y a plus de gros module UI "fourre-tout" uniquement la pour declarer des imports

### Ressources

- Standalone migration: [https://angular.dev/reference/migrations/standalone](https://angular.dev/reference/migrations/standalone)

---

## Chapitre 2 - Moderniser les templates avec `@if`, `@for`, `@switch` et `@let`

### Ce que ca change

Angular a introduit une nouvelle syntaxe de controle de flux pour les templates.

On ne passe plus uniquement par:

- `*ngIf`
- `*ngFor`
- `*ngSwitch`

On peut maintenant utiliser:

- `@if`
- `@for`
- `@switch`
- `@let`

### Impact concret

Les templates deviennent:

- plus lisibles
- moins verbeux
- plus proches d une logique declarative

Et surtout, `@for` met davantage en avant le `track`, qui est souvent crucial pour les perfs et la stabilite du DOM.

### Utilite

Ce nouveau controle de flux est utile des que:

- le template contient plusieurs branches conditionnelles
- la liste affichee est dynamique
- on repete plusieurs fois la meme expression

`@let` est tres utile pour nommer une valeur intermediaire dans un template sans la recalculer visuellement partout.

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

### Deuxieme exemple utile avec `@let`

Avant:

```html
<p>{{ filteredProducts.length }} resultat(s)</p>
<button [disabled]="filteredProducts.length === 0">Exporter</button>
```

Maintenant:

```html
@let count = filteredProducts().length;

<p>{{ count }} resultat(s)</p>
<button [disabled]="count === 0">Exporter</button>
```

### Message cle

La nouvelle syntaxe ne sert pas a faire "plus moderne".
Elle sert a raconter plus clairement l intention du template.

### Ressources

- Control flow: [https://angular.dev/guide/templates/control-flow](https://angular.dev/guide/templates/control-flow)
- Variables en template: [https://angular.dev/guide/templates/variables](https://angular.dev/guide/templates/variables)

---

## Chapitre 3 - Repenser le state local avec les Signals

### Ce que ca change

Les Signals introduisent une facon plus explicite de modeliser le state local.

Angular distingue maintenant beaucoup mieux:

- la valeur source avec `signal()`
- la valeur derivee avec `computed()`
- l effet de bord avec `effect()`

### Qu est-ce qu un signal ?

Un signal est une **valeur reactive courante**.

Concretement:

- on peut la lire immediatement
- on peut la mettre a jour
- Angular sait qui depend de cette valeur
- quand elle change, les derivees et le template se remettent a jour automatiquement

Exemple tres simple:

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

Autres declarations simples:

```ts
readonly searchTerm = signal('');
readonly isLoading = signal(false);
readonly selectedCategory = signal<'all' | 'hardware' | 'software'>('all');
```

Le point important:
un signal est la bonne primitive pour une **source de verite locale** dans un composant.

### Qu est-ce qu un `computed()` ?

Un `computed()` sert a declarer une **valeur derivee**.

Il ne stocke pas une nouvelle source de verite.
Il calcule une valeur a partir d autres signals.

Exemple simple:

```ts
readonly count = signal(2);
readonly doubled = computed(() => this.count() * 2);
```

Ici:

- `count` est la source
- `doubled` est la derivee

Si `count` passe a `3`, alors `doubled()` vaudra automatiquement `6`.

Autre exemple simple et parlant:

```ts
readonly firstName = signal('Ada');
readonly lastName = signal('Lovelace');

readonly fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

Autre exemple de derivee booleenne:

```ts
readonly items = signal<string[]>([]);
readonly hasItems = computed(() => this.items().length > 0);
```

Le bon reflexe:
si une valeur peut etre calculee proprement a partir d autres signals, elle doit souvent etre un `computed()`.

### Qu est-ce qu un `effect()` ?

Un `effect()` sert a declarer un **effet de bord**.

Un effet de bord, c est une action qui ne sert pas a produire une nouvelle valeur metier, mais a synchroniser quelque chose a l exterieur:

- le titre de la page
- un log
- du stockage local
- un appel vers une API imperative

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

### La regle simple a retenir

- `signal()` = je stocke une source de verite
- `computed()` = je derive une nouvelle valeur
- `effect()` = je synchronise un effet externe

### Impact concret

Le gros gain n est pas:

> le template se met a jour

Parce qu avec Angular, un template se mettait deja a jour avec des proprietes classiques.

Le vrai gain est plutot:

- on voit mieux ce qui est la source de verite
- on evite les derivees recalculees a la main
- on reduit les oublis de synchronisation
- on isole mieux les effets de bord

En pratique, cela reduit beaucoup les patterns du type:

- "j ai oublie de recalculer le compteur"
- "j ai oublie de remettre a jour le titre"
- "j ai deux proprietes qui devraient toujours rester synchronisees"

### Utilite

Les Signals sont tres utiles pour:

- le state local d un composant
- les filtres
- les compteurs
- les derivees d affichage
- les petits view models locaux

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

### Exemple tres simple a montrer a l oral

```ts
readonly price = signal(100);
readonly quantity = signal(2);
readonly total = computed(() => this.price() * this.quantity());
```

Puis:

```ts
this.quantity.set(3);
console.log(this.total()); // 300
```

Le message est simple:
on n a pas besoin de recalculer `total` a la main.

### A marteler a l oral

- `signal()` = source
- `computed()` = derivee
- `effect()` = effet de bord

Et surtout:

> un `effect()` ne doit pas servir a recalculer un state metier qui pourrait etre un `computed()`

Exemple a eviter:

```ts
effect(() => {
  this.total.set(this.price() * this.quantity());
});
```

Ici, `total` devrait etre un `computed()`, pas un `signal()` mis a jour par effet.

### Ressources

- Signals: [https://angular.dev/guide/signals](https://angular.dev/guide/signals)

---

## Chapitre 4 - Moderniser la communication composant avec `input()` et `output()`

### Ce que ca change

Pendant longtemps, les composants Angular ont communique avec:

- `@Input()`
- `@Output()`
- `EventEmitter`

Angular propose aujourd hui des APIs plus directes:

- `input()`
- `output()`

### Impact concret

La declaration devient:

- plus concise
- plus lisible
- plus coherente avec les autres primitives modernes du framework

### Utilite

Cette modernisation est utile des qu on veut:

- rafraichir un composant enfant legacy
- aligner les composants avec les autres APIs modernes Angular
- reduire un peu le bruit dans la declaration d interface d un composant

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

### Exemple utile avec `input` transform

```ts
@Component({
  selector: 'app-user-details',
  template: `<p>Nom affiche: {{ name() }}</p>`
})
export class UserDetailsComponent {
  readonly name = input('', {
    transform: (value: string) => value.trim().toUpperCase()
  });
}
```

Ici, Angular transforme la valeur recue avant qu elle soit utilisee dans le composant.

Cet exemple est utile pour montrer qu un `input()` moderne ne sert pas seulement a declarer une entree:

- il peut aussi normaliser une valeur
- il garde une API locale et explicite
- il s integre naturellement avec le reste du modele Signals

### Exemple d utilisation cote enfant avec derivees

```ts
@Component({
  selector: 'app-product-summary',
  template: `
    <p>{{ summaryLabel() }}</p>
    <button type="button" (click)="toggleAvailableOnly()">
      {{ buttonLabel() }}
    </button>
  `
})
export class ProductSummaryComponent {
  readonly resultsCount = input.required<number>();
  readonly pageTitle = input.required<string>();
  readonly availableOnly = input(false);
  readonly availableOnlyChange = output<boolean>();

  readonly summaryLabel = computed(() =>
    `${this.pageTitle()} - ${this.resultsCount()} resultat(s)`
  );

  readonly buttonLabel = computed(() =>
    this.availableOnly() ? 'Afficher tout' : 'Afficher seulement les disponibles'
  );

  constructor() {
    effect(() => {
      console.log(`Le parent a envoye ${this.resultsCount()} resultat(s)`);
    });
  }

  toggleAvailableOnly(): void {
    this.availableOnlyChange.emit(!this.availableOnly());
  }
}
```

### Ce que montre cet exemple

- l `input()` est lui aussi lu comme un signal
- on peut donc construire un `computed()` directement dessus
- on peut aussi observer une evolution via `effect()`

Autrement dit:
les entrees d un composant moderne Angular s integrent naturellement au modele Signals.

### Exemple d utilisation cote parent

```html
<app-product-summary
  [resultsCount]="resultsCount()"
  [pageTitle]="pageTitle()"
  [availableOnly]="availableOnly()"
  (availableOnlyChange)="setAvailableOnly($event)"
/>
```

### Message cle

Le parent reste proprietaire du state.
L enfant ne fait que:

- recevoir des donnees
- emettre une intention

Mais comme les `input()` sont des signals, l enfant peut aussi:

- calculer une vue derivee avec `computed()`
- reagir a une evolution avec `effect()`

### Ressources

- Inputs: [https://angular.dev/guide/components/inputs](https://angular.dev/guide/components/inputs)
- Outputs: [https://angular.dev/guide/components/outputs](https://angular.dev/guide/components/outputs)

---

## Chapitre 5 - Faire cohabiter RxJS et Signals

### Ce que ca change

Une equipe Angular 16 a deja de nombreux flux RxJS.
Le sujet n est donc pas de tout remplacer.

Le vrai sujet est:

> comment consommer un flux RxJS proprement dans une UI Angular moderne

### Impact concret

Angular fournit une interop officielle.
On peut garder:

- RxJS dans les services
- Signals dans les composants

Ce qui permet de moderniser la couche UI sans tout rearchitecturer.

### Utilite

Tres utile quand:

- un service expose deja un `Observable`
- le composant veut juste lire une valeur courante
- on veut ensuite faire des derivees d affichage simples avec `computed()`

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
- utile pour une operation ponctuelle

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

- plusieurs emissions
- utile pour les streams, events et combinaisons complexes

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
- tres pratique pour le state local Angular

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

### Exemple complementaire avec `outputToObservable`

On peut aussi faire le chemin inverse cote composant parent:
consommer un `output()` comme un flux RxJS quand on veut lui appliquer des operateurs.

Imports utiles pour cet exemple:

```ts
import { AfterViewInit, Component, viewChild } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
```

```ts
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildEditorComponent],
  template: `
    <app-child-editor #editor />
    <p>Derniere valeur recue: {{ lastValidName }}</p>
  `
})
export class ParentComponent implements AfterViewInit {
  readonly editor = viewChild.required(ChildEditorComponent);
  lastValidName = '';

  ngAfterViewInit(): void {
    outputToObservable(this.editor().nameChange)
      .pipe(filter((name) => name.length >= 3))
      .subscribe((name) => {
        this.lastValidName = name;
      });
  }
}
```

```ts
@Component({
  selector: 'app-child-editor',
  standalone: true,
  template: `
    <button type="button" (click)="rename('Ada')">Envoyer Ada</button>
    <button type="button" (click)="rename('Al')">Envoyer Al</button>
  `
})
export class ChildEditorComponent {
  readonly nameChange = output<string>();

  rename(name: string): void {
    this.nameChange.emit(name);
  }
}
```

Dans cet exemple:

- l enfant emet toujours avec `output()`
- le parent convertit cet output en `Observable`
- RxJS filtre ensuite les valeurs trop courtes

Cela montre bien que Signals et RxJS ne s opposent pas:
Angular fournit des points de passage officiels entre les deux modeles.

### Message cle

`toSignal()` ne remplace pas RxJS.
`toSignal()` permet a un composant Angular de lire plus simplement la valeur courante issue d un flux RxJS.

### Ressources

- RxJS interop: [https://angular.dev/ecosystem/rxjs-interop](https://angular.dev/ecosystem/rxjs-interop)
- `toSignal()`: [https://angular.dev/ecosystem/rxjs-interop#create-a-signal-from-an-rxjs-observable-with-tosignal](https://angular.dev/ecosystem/rxjs-interop#create-a-signal-from-an-rxjs-observable-with-tosignal)

---

## Chapitre 6 - Structurer un state partage avec NgRx Signal Store

### Ce que ca change

Quand plusieurs parties de l application ont besoin du meme state, le simple state local de composant ne suffit plus.

NgRx Signal Store permet de structurer ce state partage en separant clairement:

- l etat brut
- les derivees
- les intentions metier
- le cycle de vie

### Impact concret

Le gros interet dans cet atelier est le suivant:

- on charge une fois
- on garde les donnees en memoire tant que la SPA tourne
- on evite des appels redondants

Important:
cela ne veut pas dire persistance disque.
Si on recharge completement l onglet navigateur, le state repart de zero.

### Utilite

Tres utile quand:

- plusieurs vues consomment les memes donnees
- le chargement reseau est mutualise
- le filtre, les favoris ou le statut doivent etre partages

### Avant

```ts
@Component({
  selector: 'app-products-page',
  template: `...`
})
export class ProductsPageComponent {
  private readonly productService = inject(ProductService);

  readonly products = signal<Product[]>([]);
  readonly favoriteIds = signal<number[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  async loadProducts(): Promise<void> {
    this.loading.set(true);

    try {
      this.products.set(await this.productService.loadProducts());
    } finally {
      this.loading.set(false);
    }
  }
}
```

Ici, le composant:

- injecte le service
- porte lui-meme l etat
- pilote lui-meme le chargement
- doit etre remonte sur chaque vue qui en a besoin

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
  })),
  withHooks({
    onInit(store) {
      void store.loadProducts();
    }
  })
);
```

Puis, le composant devient beaucoup plus simple:

```ts
@Component({
  selector: 'app-products-page',
  template: `...`
})
export class ProductsPageComponent {
  readonly store = inject(ProductsStore);
}
```

Ici, le service existe toujours.
La difference, c est que le composant n orchestre plus lui-meme le chargement.
Le store devient l endroit central qui:

- appelle le service
- garde l etat en memoire
- expose les derivees
- mutualise la logique entre plusieurs vues

### Vocabulaire cle

- `withEntities()` = collection metier
- `withState()` = etat brut
- `withComputed()` = derivees
- `withMethods()` = intentions metier
- `withHooks()` = cycle de vie
- `withStatus()` = statut de chargement explicite dans notre atelier

### Exemple important a montrer

```ts
async loadProducts() {
  if (store.entities().length > 0) {
    return;
  }

  // sinon seulement on charge
}
```

Ce petit garde-fou explique tres bien l interet du store partage:
pas besoin de recharger ce qui est deja en memoire.

### Ressources

- Guide Signal Store: [https://ngrx.io/guide/signals/signal-store](https://ngrx.io/guide/signals/signal-store)
- API `withEntities`: [https://ngrx.io/api/signals/entities/withEntities](https://ngrx.io/api/signals/entities/withEntities)
- API `withComputed`: [https://ngrx.io/api/signals/withComputed](https://ngrx.io/api/signals/withComputed)
- API `withMethods`: [https://ngrx.io/api/signals/withMethods](https://ngrx.io/api/signals/withMethods)
- API `withHooks`: [https://ngrx.io/api/signals/withHooks](https://ngrx.io/api/signals/withHooks)

---

## Chapitre 7 - Ouvrir la discussion sur Signal Forms

### Ce que ca change

Signal Forms montre la direction que prend Angular pour les formulaires.
On ne raisonne plus seulement en:

- `FormGroup`
- `FormControl`

mais davantage en:

- modele de donnees
- formulaire derive de ce modele
- champs relies a ce modele

### Impact concret

Le vocabulaire change:

- on part d un modele signal
- on construit le formulaire avec `form()`
- les champs sont relies via `[formField]`

### Utilite

Ce sujet est surtout utile aujourd hui pour:

- faire de la veille
- comprendre la direction du framework
- comparer avec Reactive Forms

### Point de vigilance

La documentation Angular presente encore Signal Forms comme experimental.
Il faut donc le presenter comme:

- un sujet tres interessant
- une piste d avenir
- pas encore une generalisation immediate en prod sans recul

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

### Message cle

Signal Forms est a presenter comme un sujet d ouverture:

- tres interessant
- tres formateur
- mais encore a manipuler avec prudence

### Ressources

- Signal Forms: [https://angular.dev/essentials/signal-forms](https://angular.dev/essentials/signal-forms)
- Tutorial: [https://angular.dev/tutorials/signal-forms](https://angular.dev/tutorials/signal-forms)

---

## Conclusion - Ce qu on adopte vite, ce qu on adopte avec prudence

### A adopter vite

- Standalone
- nouveau controle de flux
- `@let`
- Signals pour le state local
- `input()` et `output()`
- interop RxJS / Signals

### A adopter avec un vrai cadrage projet

- NgRx Signal Store

Parce que le sujet n est pas seulement syntaxique.
Il touche a la structure globale de l application.

### A presenter avec prudence

- Signal Forms

Parce que l API reste experimentale et doit etre distinguee des sujets deja tres matures.

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

Cette version sert de support de presentation global.
La suite logique est de la paufiner ensemble en ajoutant:

- un timing estime par chapitre
- des notes d oral
- des schemas simples
- des messages d attention "a ne pas surutiliser"
- des references directes aux fichiers du projet pour chaque demonstration
