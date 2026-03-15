# Exercice 1 - Standalone

## Contexte

L equipe vient d Angular 16, ou le reflexe naturel etait souvent de creer un `NgModule` pour chaque feature.
Depuis les versions recentes d Angular, l approche recommandee est de construire les composants, routes et providers
en mode standalone.

Le but de cet exercice est de comprendre ce changement sans introduire d autre sujet en meme temps.

## Pourquoi ce changement ?

Avant :
- les declarations passaient par un module
- les imports etaient centralises dans ce module
- on ajoutait souvent une couche de structure meme pour une petite feature

Maintenant :
- chaque composant declare directement ses dependances dans `imports`
- une route peut charger une page avec `loadComponent`
- on lit plus facilement ce dont un composant depend reellement

## Ce qu on faisait avant

Exemple classique Angular 16 :

```ts
@NgModule({
  declarations: [Exercise1Component, MemberProfileCard, MemberSkillList],
  imports: [CommonModule, CardModule, TagModule, RouterModule.forChild(routes)]
})
export class TeamFeatureModule {}
```

Ce modele fonctionne, mais il ajoute un point d entree supplementaire a maintenir.

## Ce qu on fait maintenant

Exemple standalone :

```ts
@Component({
  standalone: true,
  imports: [MemberProfileCard, MemberSkillList, CardModule],
  templateUrl: './exercise-1.html'
})
export class Exercise1 {}
```

Et la route :

```ts
{
  path: 'exercise-1',
  loadComponent: () => import('./exercise-1').then((m) => m.Exercise1)
}
```

## Mise en place

Pour passer en standalone, il faut retenir 3 idees simples :

1. Le composant devient autonome.
   - Il declare `standalone: true`.
   - Il liste ses dependances dans `imports`.

2. Les enfants sont importes directement par le parent.
   - Plus besoin de les declarer dans un `NgModule`.

3. Le routing charge la page directement.
   - On utilise `loadComponent` au lieu d un module lazy-load classique.

## Exercice pratique

Construire une petite fiche collaborateur avec :
- un composant parent `Exercise1`
- un composant enfant `MemberProfileCard`
- un composant enfant `MemberSkillList`

Objectif :
- afficher une fiche simple
- garder une structure tres legere
- montrer un parent standalone qui importe ses enfants directement

## Critères de validation

- aucun `NgModule` n est cree pour cette feature
- la page est chargee par la route `exercise-1` via `loadComponent`
- le parent importe directement les composants enfants
- chaque composant standalone importe seulement ce dont il a besoin

## Bonus optionnel

- ajouter un deuxieme collaborateur
- remplacer un composant enfant par un autre sans toucher a un module central
