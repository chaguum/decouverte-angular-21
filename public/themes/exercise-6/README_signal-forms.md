# Exercice 6 - Signal Forms

## Contexte

Cet exercice introduit les Signal Forms d Angular.
Le sujet est tres interessant pedagogiquement, mais il faut etre clair avec l equipe:
la documentation Angular presente encore cette API comme **experimentale**.

Cela signifie:

- la feature est tres interessante a decouvrir
- elle montre clairement la direction prise par Angular
- mais il faut rester prudent avant d en faire une regle absolue en production

Source officielle:
[Signal Forms essentials](https://angular.dev/essentials/signal-forms)

## Pourquoi Angular propose cette approche

Angular veut rapprocher les formulaires du modele Signals deja introduit ailleurs dans le framework.

L idee generale est la suivante:

- le formulaire est pilote par un modele de donnees
- ce modele est relie a un arbre de champs
- les champs, leurs erreurs et leur etat deviennent plus explicites

Pour une equipe qui vient de `ReactiveFormsModule`, le changement de vocabulaire est important.
On ne raisonne plus d abord en `FormGroup` et `FormControl`, mais en **modele de formulaire** et en
**FieldTree**.

## Ce qu on faisait avant

En Reactive Forms classique, on ecrivait souvent quelque chose comme ceci:

```ts
readonly profileForm = new FormGroup({
  name: new FormControl('', { nonNullable: true }),
  email: new FormControl('', { nonNullable: true }),
  role: new FormControl('developer', { nonNullable: true })
});
```

Puis dans le template:

```html
<input [formControl]="profileForm.controls.name" />
<input [formControl]="profileForm.controls.email" />
```

Cette approche reste valide et solide.
Mais Angular explore ici une autre direction, plus proche des Signals.

## Ce qu on fait maintenant

Avec Signal Forms, on part d abord d un modele.

Exemple conceptuel:

```ts
readonly profileModel = signal({
  name: '',
  email: '',
  role: 'developer'
});
```

Puis on transforme ce modele en formulaire:

```ts
readonly profileForm = form(this.profileModel);
```

L idee a retenir:

- `profileModel` represente les donnees
- `form(profileModel)` cree la structure reactive de champs

## Exemple de champ

Un champ peut ensuite etre branche au template avec l outillage dedie de Signal Forms.

Exemple simplifie:

```html
<input [formField]="profileForm.name" />
```

Ce que cela signifie:

- le champ est connecte au modele
- sa valeur est synchronisee avec le state du formulaire
- son etat et ses erreurs deviennent lisibles dans une logique plus uniforme

## Exemple de validation

Angular montre aussi un modele de validation plus proche de cette nouvelle structure.

Exemple conceptuel:

```ts
readonly profileForm = form(this.profileModel, (path) => {
  required(path.name);
  email(path.email);
});
```

L idee pedagogique ici:

- la validation est attachee au modele de formulaire
- les regles sont visibles au meme endroit
- le template peut ensuite afficher les erreurs de facon ciblee

## Architecture de l exercice

- `Exercise6` sert de parent de page
- `Exercise6Sandbox` montre un petit formulaire `Reactive Forms` classique
- `Exercise6Result` montre le meme formulaire pilote par Signal Forms

Le scenario retenu dans le projet est un formulaire de profil tres court avec:

- nom
- email
- role
- opt-in newsletter

Il contient aussi:

- une validation simple
- un bouton de pre-remplissage
- un apercu live du modele courant
- une soumission avec recapitulatif

## Mission

Transformer un petit formulaire de profil en version Signal Forms:

1. creer un modele de formulaire
2. passer ce modele a `form()`
3. connecter les champs au template
4. ajouter une validation simple
5. afficher les erreurs et la soumission
6. conserver le bouton de pre-remplissage

L exercice doit rester tres court.
Le but n est pas de couvrir tous les formulaires Angular, mais de comprendre le principe.

## Ce que l equipe doit comprendre a la fin

- ce qu est un modele de formulaire pilote par signals
- a quoi sert `form()`
- comment relier un champ au template
- pourquoi cette approche est prometteuse
- pourquoi il faut tout de meme garder en tete le caractere experimental de l API

## Criteres de validation

- un modele de formulaire est cree
- `form()` est utilise pour construire la structure reactive
- au moins une validation est definie
- le template est branche au formulaire signal
- le fonctionnement final est equivalent au formulaire de depart

## Ressources officielles

- Signal Forms essentials: [https://angular.dev/essentials/signal-forms](https://angular.dev/essentials/signal-forms)
- Tutorial Signal Forms: [https://angular.dev/tutorials/signal-forms](https://angular.dev/tutorials/signal-forms)
