# Exercice 1 - Standalone

## Contexte

Quand on vient d Angular 16, on pense encore tres souvent en `NgModule`.
Pendant longtemps, c etait la facon normale d organiser une feature:

- un module pour declarer les composants
- un module pour regrouper les imports
- un module pour brancher les routes

Depuis les versions recentes d Angular, la direction recommandee est plus simple:
on raisonne d abord en composants autonomes.

## Pourquoi Angular pousse ce changement

Le but n est pas seulement de reduire le nombre de lignes.
Le vrai but est de rendre le code plus local et plus lisible.

Avec une architecture standalone:

- le composant declare lui-meme ce dont il depend
- le routeur peut charger directement ce composant
- on supprime des modules intermediaires purement structurels

Quand on lit une page, on comprend donc plus vite:

- de quoi elle depend
- comment elle est composee
- comment elle est chargee

## Ce qu on faisait avant

Avant, une feature simple pouvait ressembler a ceci:

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

Cette approche fonctionne, mais elle ajoute une couche supplementaire meme quand la feature est petite.

## Ce qu on fait maintenant

Avec standalone, le composant devient autonome:

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

Ce qui est interessant ici, c est que les composants PrimeNG importes sont visibles directement dans le composant:

- `Button`
- `InputText`

On voit tout de suite ce que la page utilise.

## Routing moderne

### Cas simple avec `loadComponent`

```ts
{
  path: 'profile',
  loadComponent: () =>
    import('./profile-form.component').then((m) => m.ProfileFormComponent)
}
```

### Cas un peu plus structure avec `loadChildren`

```ts
export const adminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./users-page/users-page.component').then((m) => m.UsersPageComponent)
      }
    ]
  }
];

{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes)
}
```

Le point important a retenir:

- `loadComponent` est parfait pour charger une page directement
- `loadChildren` reste utile si on veut un petit arbre de routes enfant

## Architecture de l exercice

L exercice est organise en trois composants:

- `Exercise1` : le parent de la page
- `Exercise1Sandbox` : le point de depart
- `Exercise1Result` : la correction finale

La sandbox part volontairement d une approche plus ancienne:

- composant non standalone
- `FormsModule` importe dans un module annexe

La correction montre la cible:

- composant standalone
- imports locaux
- composants PrimeNG standalone importes directement la ou ils servent

## Mission

L objectif est de comprendre ce que change standalone sur une page tres simple.

Vous devez observer puis reproduire une logique de ce type:

1. supprimer la dependance au module intermediaire
2. remettre `FormsModule` au bon endroit
3. importer localement les composants utilises
4. garder le meme comportement fonctionnel

Le sujet n est pas l UI.
Le sujet est la localisation explicite des dependances.

## Ce que l equipe doit comprendre a la fin

- pourquoi Angular cherche a reduire la dependance aux `NgModule`
- comment un composant standalone declare ses imports
- pourquoi cette approche est plus lisible sur de petites features
- pourquoi c est tres parlant avec une bibliotheque UI comme PrimeNG
- dans quels cas `loadComponent` et `loadChildren` ont chacun du sens

## Criteres de validation

- aucun `NgModule` n est cree pour cette feature
- le parent importe `Exercise1Sandbox` et `Exercise1Result`
- la version de depart utilise encore un module pour porter `FormsModule`
- `Exercise1Result` importe uniquement les composants standalone PrimeNG necessaires
- le comportement fonctionnel du formulaire reste identique entre sandbox et correction

## Ressources officielles

- Standalone components: [https://angular.dev/guide/components](https://angular.dev/guide/components)
- Standalone migration: [https://angular.dev/reference/migrations/standalone](https://angular.dev/reference/migrations/standalone)
