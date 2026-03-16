# Exercice 1 - Standalone

## Contexte

Quand on vient d Angular 16, on a souvent le reflexe de penser d abord en `NgModule`.
Pendant longtemps, c etait normal: les composants etaient declares dans un module, les imports
etaient regroupes dans ce module, et le routing lazy chargeait souvent un module de feature.

Depuis les versions recentes d Angular, l approche recommandee est differente:
les composants sont concus comme des briques autonomes, directement chargeables et composables.

## Pourquoi Angular a pousse ce changement ?

L idee est simple: rendre le code plus lisible et plus local.

Avant, pour comprendre un composant, il fallait souvent ouvrir son module pour savoir:
- s il etait declare
- quels modules il utilisait
- comment il etait expose

Avec standalone, on lit beaucoup plus vite la page:
- le composant declare ce dont il depend
- la route charge directement le composant
- on reduit le boilerplate structurel

Ce n est pas juste "moins de code". C est surtout une architecture plus explicite.

## Ce qu on faisait avant

En Angular 16, une feature simple pouvait ressembler a ceci:

```ts
@NgModule({
  declarations: [Exercise1Component, MemberProfileCard, MemberSkillList],
  imports: [CommonModule, CardModule, TagModule, RouterModule.forChild(routes)]
})
export class TeamFeatureModule {}
```

Cette approche reste valide historiquement, mais elle ajoute une couche intermediaire meme
quand la feature est tres petite.

## Ce qu on fait maintenant

Avec standalone, le parent devient autonome:

```ts
@Component({
  standalone: true,
  imports: [MemberProfileCard, MemberSkillList, CardModule],
  templateUrl: './exercise-1.html'
})
export class Exercise1 {}
```

Et la route charge directement la page:

```ts
{
  path: 'exercise-1',
  loadComponent: () => import('./exercise-1').then((m) => m.Exercise1)
}
```

Le gain pedagogique est important: les dependances sont visibles exactement la ou elles servent.

## Mise en place

Pour adopter standalone, retenez ces trois reflexes:

1. Chaque composant declare `standalone: true`.
2. Chaque composant liste ses dependances dans `imports`.
3. Le routing utilise `loadComponent` pour charger la page.

Autrement dit: on remplace une organisation "par module" par une organisation "par composant".

## Mission

Votre mission est de construire une petite fiche collaborateur composee de:
- un parent `Exercise1`
- un composant `MemberProfileCard`
- un composant `MemberSkillList`

Le but n est pas de faire une grosse feature.
Le but est de ressentir concretement ce que change standalone dans la structure du code.

## Ce que vous devez comprendre a la fin

- pourquoi Angular cherche a reduire la dependance aux `NgModule`
- comment un parent standalone importe directement ses enfants
- comment une route charge un composant sans module de feature
- pourquoi cette approche simplifie les petites features et le lazy loading

## Criteres de validation

- aucun `NgModule` n est cree pour cette feature
- la page est chargee via `loadComponent`
- le parent importe directement ses composants enfants
- chaque composant declare uniquement les imports dont il a besoin

## Ressources officielles

- Standalone components: [https://angular.dev/guide/components](https://angular.dev/guide/components)
- Standalone migration: [https://angular.dev/reference/migrations/standalone](https://angular.dev/reference/migrations/standalone)
