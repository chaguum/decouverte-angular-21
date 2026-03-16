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

## Architecture de l exercice

L exercice est organise en trois composants clairement separes:

- `Exercise1` : le composant parent de la page
- `Exercise1Sandbox` : la version de travail pour les developpeurs
- `Exercise1Result` : la correction finale attendue

Cette separation est volontaire.
Elle permet de bien distinguer:
- ce que l equipe doit modifier
- ce que donne une implementation finale propre

## Mission

Votre mission est de partir du composant `Exercise1Sandbox`, qui contient un formulaire HTML natif,
puis de comprendre ce que montre la correction `Exercise1Result`.

Dans cette correction, la solution cible est:
- un formulaire realise avec des composants standalone PrimeNG
- des imports declares directement dans le composant
- aucune dependance a un `NgModule`

Le point de depart de la sandbox est volontairement plus ancien:
- le composant n est pas standalone
- `FormsModule` est importe via un module annexe

L une des transformations attendues consiste donc a remettre `FormsModule` au bon endroit et a
faire disparaitre cette dependance au module.

Le formulaire peut rester simple.
Ce n est pas un exercice d UI.
Le vrai sujet est l import local des composants standalone.

## Ce que vous devez comprendre a la fin

- pourquoi Angular cherche a reduire la dependance aux `NgModule`
- comment un parent standalone compose une page avec d autres composants standalone
- comment une route charge un composant sans module de feature
- pourquoi cette approche simplifie les petites features et le lazy loading
- pourquoi `FormsModule` et les composants PrimeNG doivent etre importes directement la ou ils servent

## Criteres de validation

- aucun `NgModule` n est cree pour cette feature
- le parent importe `Exercise1Sandbox` et `Exercise1Result`
- la version de depart utilise encore un module pour porter `FormsModule`
- `Exercise1Result` importe uniquement les composants standalone PrimeNG necessaires
- le comportement fonctionnel du formulaire reste identique entre sandbox et correction

## Ressources officielles

- Standalone components: [https://angular.dev/guide/components](https://angular.dev/guide/components)
- Standalone migration: [https://angular.dev/reference/migrations/standalone](https://angular.dev/reference/migrations/standalone)
