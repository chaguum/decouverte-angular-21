# Exercice 3.5 - Signals et input/output

## Contexte

Cet exercice prolonge directement l exercice 3.
Le parent utilise deja des Signals pour son state local.
Nous ajoutons maintenant un composant enfant de resume.

Le but est de montrer que la communication parent / enfant peut elle aussi etre modernisee.

## Pourquoi Angular propose `input()` et `output()`

Pendant longtemps, Angular a utilise:

- `@Input()`
- `@Output()`
- `EventEmitter`

Ces APIs restent valides.
Mais Angular propose aujourd hui une ecriture plus directe:

- `input()`
- `output()`

L interet est double:

- la declaration est plus concise
- elle s aligne beaucoup mieux avec le reste du modele Signals

## Ce qu on faisait avant

Avant, un composant enfant pouvait ressembler a ceci:

```ts
@Input() resultsCount = 0;
@Input() pageTitle = '';
@Output() availableOnlyChange = new EventEmitter<boolean>();
```

Cette ecriture fonctionne, mais elle reste separee du reste des primitives modernes Angular.

## Ce qu on fait maintenant

```ts
readonly resultsCount = input.required<number>();
readonly pageTitle = input.required<string>();
readonly availableOnly = input(false);
readonly availableOnlyChange = output<boolean>();
```

Ce qui devient interessant, c est que `input()` se lit comme un signal.

## Exemple de derivee dans l enfant

```ts
readonly summaryLabel = computed(() =>
  `${this.pageTitle()} - ${this.resultsCount()} resultat(s)`
);
```

Ici, l enfant ne possede pas le state global.
Il se contente de deriver une information d affichage a partir de ce que le parent lui envoie.

## Exemple d `effect()` dans l enfant

```ts
constructor() {
  effect(() => {
    console.log(`Le parent a envoye ${this.resultsCount()} resultat(s)`);
  });
}
```

Le point important est pedagogique:
les `input()` s integrent naturellement au meme modele que les autres signals.

## Exemple complet cote enfant

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

  toggleAvailableOnly(): void {
    this.availableOnlyChange.emit(!this.availableOnly());
  }
}
```

## Exemple cote parent

```html
<app-product-summary
  [resultsCount]="resultsCount()"
  [pageTitle]="pageTitle()"
  [availableOnly]="availableOnly()"
  (availableOnlyChange)="setAvailableOnly($event)"
/>
```

## Architecture de l exercice

- `Exercise35` : le parent de page
- `Exercise35Sandbox` : un parent moderne avec un enfant legacy
- `Exercise35Result` : un parent moderne avec un enfant ecrit en `input()` / `output()`

## Mission

Votre objectif est de moderniser le composant enfant de resume.

Ce que vous devez faire:

1. remplacer `@Input()` par `input()`
2. remplacer `@Output()` et `EventEmitter` par `output()`
3. conserver le meme contrat cote parent
4. observer qu on peut ajouter des derivees avec `computed()`
5. verifier que le switch continue a filtrer correctement la liste

## Ce que l equipe doit comprendre a la fin

- le parent reste proprietaire du state
- l enfant recoit des donnees via `input()`
- l enfant remonte une intention via `output()`
- comme `input()` est lu comme un signal, l enfant peut deriver une vue locale avec `computed()`
- `input()` et `output()` sont les APIs modernes a connaitre sur Angular recent

## Criteres de validation

- le composant enfant n utilise plus `@Input()` ni `@Output()`
- `input()` et `output()` sont utilises correctement
- le parent garde la responsabilite du state
- le filtre "uniquement disponibles" fonctionne toujours
- le compteur et le titre de page restent coherents

## Ressources officielles

- Signals: [https://angular.dev/guide/signals](https://angular.dev/guide/signals)
- Inputs: [https://angular.dev/guide/components/inputs](https://angular.dev/guide/components/inputs)
- Outputs: [https://angular.dev/guide/components/outputs](https://angular.dev/guide/components/outputs)
