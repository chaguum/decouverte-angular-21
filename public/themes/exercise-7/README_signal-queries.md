# Exercice 7 - Signal queries

## Contexte

Quand une equipe vient d Angular 16, elle a souvent ce reflexe:

- `@ViewChild()` pour recuperer un element de la vue
- `@ViewChildren()` pour recuperer plusieurs enfants
- `@ContentChild()` pour lire un bloc projete
- `@ContentChildren()` pour lire plusieurs elements projetes

Ces APIs existent toujours, mais Angular propose maintenant une version plus moderne:

- `viewChild()`
- `viewChildren()`
- `contentChild()`
- `contentChildren()`

La difference importante est la suivante:
**ces queries deviennent des signaux**.

Cela veut dire qu elles se branchent naturellement avec:

- `computed()`
- `effect()`

Source officielle:
[Migration to signal queries](https://angular.dev/reference/migrations/signal-queries)

## Pourquoi Angular propose ce changement

Avec les decorateurs historiques, on lisait souvent les queries dans:

- `ngAfterViewInit`
- `ngAfterContentInit`
- ou via des proprietes `QueryList`

Le code fonctionnait, mais il etait souvent plus disperse:

- la query etait definie d un cote
- la logique derivee vivait ailleurs
- le cycle de vie devait etre pris en compte explicitement

Avec les signal queries, Angular rapproche ces informations du modele Signals deja introduit
dans le reste du framework.

En pratique, on obtient:

- une API plus homogène avec `signal()`, `computed()` et `effect()`
- des derivees plus simples a ecrire
- moins de logique imperative basee sur les hooks

## Ce qu on faisait avant

Exemple classique avec `@ViewChild()`:

```ts
@ViewChild('searchInput', { read: ElementRef })
searchInput?: ElementRef<HTMLInputElement>;

focusSearch(): void {
  this.searchInput?.nativeElement.focus();
}
```

Exemple classique avec `@ViewChildren()`:

```ts
@ViewChildren(DashboardStatCard)
cards?: QueryList<DashboardStatCard>;

get cardsCount(): number {
  return this.cards?.length ?? 0;
}
```

Exemple classique avec `@ContentChild()` et `@ContentChildren()`:

```ts
@ContentChild('panelTitle', { read: ElementRef })
panelTitle?: ElementRef<HTMLElement>;

@ContentChildren(QuickAction)
projectedActions?: QueryList<QuickAction>;

ngAfterContentInit(): void {
  this.projectedTitleDetected = !!this.panelTitle;
  this.projectedActionsCount = this.projectedActions?.length ?? 0;
}
```

Cette approche reste valide.
Mais Angular pousse maintenant une version plus reactive.

## Ce qu on fait maintenant

### `viewChild()`

```ts
readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
```

La query se lit ensuite comme un signal:

```ts
this.searchInput()?.nativeElement.focus();
```

### `viewChildren()`

```ts
readonly cards = viewChildren(DashboardStatCard);
readonly cardsCount = computed(() => this.cards().length);
```

Ici, `cards()` renvoie la liste actuelle des enfants detectes.
On peut donc en deduire directement un compteur avec `computed()`.

### `contentChild()`

```ts
readonly panelTitle = contentChild<ElementRef<HTMLElement>>('panelTitle');

readonly projectedTitleDetected = computed(() => !!this.panelTitle());
```

### `contentChildren()`

```ts
readonly projectedActions = contentChildren(QuickAction);
readonly projectedActionsCount = computed(() => this.projectedActions().length);
```

### `effect()` autour des queries

Une query signal peut aussi etre observee dans un `effect()` quand on veut produire
un effet de bord.

Exemple:

```ts
effect(() => {
  console.log(`Cartes detectees: ${this.cards().length}`);
});
```

Important:

- `computed()` sert a produire une valeur derivee
- `effect()` sert a produire un effet de bord

On ne doit pas utiliser `effect()` pour recalculer a la main un state metier qui pourrait
etre exprime en `computed()`.

## Scenario de l exercice

Le micro-scenario retenu est un petit dashboard.

Il contient:

- un champ de recherche
- trois cartes enfant
- un panneau `Actions rapides` base sur la projection de contenu

La sandbox montre:

- `@ViewChild`
- `@ViewChildren`
- `@ContentChild`
- `@ContentChildren`

Le resultat attendu montre:

- `viewChild()`
- `viewChildren()`
- `contentChild()`
- `contentChildren()`
- un `computed()` pour les resumes
- un `effect()` pour le focus et le titre de la page

## Fichiers importants dans le projet

- Parent de l exercice:
  `src/app/pages/exercise-7/exercise-7.ts`
- Sandbox:
  `src/app/pages/exercise-7/components/exercise-7-sandbox/exercise-7-sandbox.ts`
- Resultat attendu:
  `src/app/pages/exercise-7/components/exercise-7-result/exercise-7-result.ts`
- Panneau projete legacy:
  `src/app/pages/exercise-7/components/legacy-quick-actions-panel/legacy-quick-actions-panel.ts`
- Panneau projete moderne:
  `src/app/pages/exercise-7/components/signal-quick-actions-panel/signal-quick-actions-panel.ts`

## Mission

1. Reperer les queries decorateur dans la sandbox.
2. Remplacer `@ViewChild` par `viewChild()`.
3. Remplacer `@ViewChildren` par `viewChildren()`.
4. Remplacer `@ContentChild` par `contentChild()`.
5. Remplacer `@ContentChildren` par `contentChildren()`.
6. Ajouter un `computed()` pour produire un resume visible.
7. Ajouter un `effect()` simple pour mettre a jour un effet de bord.

## Ce que l equipe doit comprendre a la fin

- une signal query se lit comme un signal
- elle peut etre absente au debut, donc il faut garder une lecture defensive si besoin
- `computed()` est parfait pour deriver un resume ou un compteur
- `effect()` est reserve aux effets de bord
- la migration rend les queries beaucoup plus coherentes avec le reste des APIs modernes Angular

## Criteres de validation

- le focus sur le champ recherche fonctionne
- le nombre de cartes detectees est derive avec `computed()`
- le panneau projete utilise `contentChild()` et `contentChildren()`
- au moins un `effect()` simple est present
- le code final n utilise plus les decorateurs de query dans la correction

## Ressources officielles

- Migration to signal queries:
  [https://angular.dev/reference/migrations/signal-queries](https://angular.dev/reference/migrations/signal-queries)
