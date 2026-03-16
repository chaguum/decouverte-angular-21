# Exercice 6 - Signal Forms

## Contexte

Signal Forms est un sujet tres interessant pedagogiquement, parce qu il montre la direction que prend Angular pour les formulaires.

Il faut cependant etre tres clair avec l equipe:
la documentation officielle presente encore cette API comme experimentale.

Cela veut dire:

- le sujet est tres interessant a comprendre
- il montre la direction du framework
- mais il ne faut pas encore le presenter comme une regle absolue pour tous les projets en production

## Pourquoi Angular explore cette approche

Angular cherche a rapprocher les formulaires du modele Signals deja introduit ailleurs dans le framework.

L idee generale est la suivante:

- on part d un modele de donnees
- ce modele est pilote par des signals
- on construit ensuite le formulaire a partir de ce modele

Pour une equipe qui vient de `ReactiveFormsModule`, le changement de vocabulaire est important.
On raisonne moins en:

- `FormGroup`
- `FormControl`

et davantage en:

- modele
- structure de formulaire
- champs relies a ce modele

## Ce qu on faisait avant

Avant, on ecrivait souvent quelque chose comme ceci:

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

Cette approche reste solide et tout a fait valable.

## Ce qu on fait maintenant

Avec Signal Forms, on part d abord d un modele signal:

```ts
readonly profileModel = signal({
  name: '',
  email: '',
  role: 'developer'
});
```

Puis on construit le formulaire:

```ts
readonly profileForm = form(this.profileModel);
```

L idee a retenir est simple:

- `profileModel` represente les donnees
- `form(profileModel)` cree la structure reactive des champs

## Exemple de validation

```ts
readonly profileForm = form(this.profileModel, (path) => {
  required(path.name);
  email(path.email);
});
```

Ici, la validation est rattachee au modele de formulaire.

## Exemple de champ dans le template

```html
<input [formField]="profileForm.name" />
<input [formField]="profileForm.email" />
```

Le champ est alors relie directement au modele de formulaire.

## Ce que le sujet change vraiment

Le changement important n est pas juste syntaxique.
Le changement important est le point de depart mental:

- avant, on pensait "je construis un FormGroup"
- maintenant, on pense "je pars d un modele pilote par signals"

## Architecture de l exercice

- `Exercise6` : le parent de page
- `Exercise6Sandbox` : un petit formulaire `Reactive Forms` classique
- `Exercise6Result` : le meme formulaire en Signal Forms

Le scenario de l exercice reste volontairement simple:

- nom
- email
- role
- opt-in newsletter

avec:

- une validation simple
- un bouton de pre-remplissage
- un apercu live du modele
- une soumission avec recapitulatif

## Mission

Transformer un petit formulaire de profil en version Signal Forms:

1. creer un modele de formulaire
2. passer ce modele a `form()`
3. connecter les champs au template
4. ajouter une validation simple
5. afficher les erreurs et la soumission
6. conserver le bouton de pre-remplissage

Le but n est pas de couvrir tous les formulaires Angular.
Le but est de comprendre le principe.

## Ce que l equipe doit comprendre a la fin

- ce qu est un modele de formulaire pilote par signals
- a quoi sert `form()`
- comment relier un champ au template
- pourquoi cette approche est prometteuse
- pourquoi il faut garder en tete le caractere experimental de l API

## Criteres de validation

- un modele de formulaire est cree
- `form()` est utilise pour construire la structure reactive
- au moins une validation est definie
- le template est branche au formulaire signal
- le fonctionnement final est equivalent au formulaire de depart

## Ressources officielles

- Signal Forms essentials: [https://angular.dev/essentials/signal-forms](https://angular.dev/essentials/signal-forms)
- Tutorial Signal Forms: [https://angular.dev/tutorials/signal-forms](https://angular.dev/tutorials/signal-forms)
