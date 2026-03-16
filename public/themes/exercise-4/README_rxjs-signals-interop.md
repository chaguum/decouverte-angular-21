# Exercice 4 - Interop RxJS et Signals

## Contexte

Une equipe venant d Angular 16 ne va pas abandonner RxJS du jour au lendemain, et ce ne serait
pas une bonne idee.

Le vrai sujet n est donc pas "Signals ou RxJS ?".
Le vrai sujet est: "Comment faire cohabiter les deux proprement ?"

Cet exercice sert aussi a clarifier un point de culture generale:
Promises, Observables et Signals ne repondent pas aux memes besoins.

## Promises, Observables, Signals: trois roles differents

### Promise

Une Promise represente en general un resultat unique a venir.
Exemple: recuperer une ressource une seule fois.

```ts
async function loadUser(): Promise<User> {
  const response = await fetch('/api/user');
  return response.json();
}
```

Ce que cela fait:

- le code lance une operation asynchrone
- la Promise se resout une seule fois
- vous recevez une valeur finale unique
- si la valeur change plus tard, la Promise ne vous prevenira pas

Une Promise est donc adaptee a:

- un appel HTTP unique
- une initialisation simple
- un traitement ponctuel

### Observable

Un Observable represente un flux dans le temps.
Exemple: WebSocket, formulaire, evenement, polling, combinaison de flux.

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

Ce que cela fait:

- `query$` peut emettre plusieurs valeurs au fil du temps
- `products$` peut lui aussi emettre plusieurs fois
- `combineLatest()` recalcule a chaque nouvelle emission
- le composant manipule donc un vrai flux continu

Un Observable est bien adapte a:

- une suite d evenements utilisateur
- un stream websocket
- une composition de flux
- des pipelines RxJS complexes

### Signal

Un Signal represente une valeur reactive courante.
Exemple: etat local, vue derivee, interaction directe avec le template Angular.

```ts
readonly query = signal('');

readonly filteredProducts = computed(() =>
  this.products().filter((product) => product.name.includes(this.query()))
);
```

Ce que cela fait:

- `query` represente une valeur courante lisible immediatement
- `filteredProducts` se recalcule automatiquement quand `query()` ou `products()` changent
- le template Angular peut lire directement cette valeur courante
- on ne manipule pas un pipeline de flux, mais un state local derive

Un Signal est bien adapte a:

- un state local de composant
- un compteur, un filtre, un tri
- des derivees d affichage
- une lecture simple dans le template

Resume rapide:

- `Promise` = une valeur unique plus tard
- `Observable` = plusieurs valeurs dans le temps
- `Signal` = la valeur courante reactive, facile a lire dans Angular

Le bon raisonnement n est pas de choisir un "vainqueur".
Le bon raisonnement est de choisir l outil adapte.

## Pourquoi Angular a ajoute une interop officielle ?

Parce qu Angular sait tres bien qu un projet moderne contient souvent:

- des APIs Angular basees sur signals
- des services et streams historiques en RxJS

Angular fournit donc une interop officielle pour relier ces deux mondes sans bricolage.

## Ce qu on faisait avant

Dans la sandbox, le service expose un `Observable` de suggestions produits.
Le composant consomme ce flux de maniere 100% RxJS:

- `BehaviorSubject` pour la recherche
- `combineLatest()` pour recouper le flux distant et le filtre local
- `map()` pour produire la liste filtree
- `async` dans le template

Cette approche est correcte, mais elle devient vite plus verbeuse cote composant, surtout pour un
besoin d affichage simple.

## Ce qu on fait maintenant

Les outils les plus utiles sont:

- `toSignal()` pour consommer un Observable comme une valeur reactive dans un composant
- `toObservable()` pour retransformer un signal en Observable quand c est utile

Exemple tres simple:

```ts
readonly products = toSignal(this.productService.products$, {
  initialValue: []
});

readonly filteredProducts = computed(() => {
  const query = this.searchTerm().trim().toLowerCase();

  return this.products().filter((product) => {
    return query.length === 0 || product.name.toLowerCase().includes(query);
  });
});
```

Ici:

- `products$` reste un `Observable` dans le service
- `toSignal()` donne au composant une valeur courante lisible avec `products()`
- `computed()` permet ensuite de deriver une vue locale tres simplement

Dans le resultat attendu de cet exercice:

- le service continue d exposer `products$` en RxJS
- le composant appelle `toSignal(products$)`
- la recherche locale devient un `signal()`
- la liste filtree devient un `computed()`

Le flux source ne change donc pas de nature.
On change uniquement la facon dont le composant lit sa valeur courante.

## Architecture de l exercice

- `Exercise4` joue le role de parent
- `Exercise4Sandbox` montre une consommation RxJS classique dans le composant
- `Exercise4Result` montre l usage de `toSignal()` pour simplifier la lecture du flux

Le but pedagogique est de comprendre le pont entre un service RxJS et une UI Angular moderne.

## Mission

Partir d un flux RxJS existant et:

- le convertir en signal avec `toSignal()`
- l afficher dans le template
- faire le filtre local avec `computed()`
- comparer mentalement ce qui reste un flux et ce qui devient une valeur courante

L objectif est de comprendre le pont entre deux modeles, pas de refaire toute l architecture.

## Ce que vous devez comprendre a la fin

- pourquoi RxJS reste utile
- pourquoi un signal peut simplifier la consommation d un flux dans un composant
- pourquoi Promise, Observable et Signal ne sont pas interchangeables
- pourquoi `toSignal()` ne remplace pas le service RxJS, mais facilite la couche composant

## Criteres de validation

- un Observable est converti avec `toSignal()`
- le template lit une valeur issue de cette conversion
- un `computed()` derive la liste filtree
- l equipe est capable d expliquer pourquoi le flux source reste un Observable

## Ressources officielles

- RxJS interop with signals: [https://angular.dev/ecosystem/rxjs-interop](https://angular.dev/ecosystem/rxjs-interop)
- `toSignal`: [https://angular.dev/api/core/rxjs-interop/toSignal](https://angular.dev/api/core/rxjs-interop/toSignal)
- Signals guide: [https://angular.dev/guide/signals](https://angular.dev/guide/signals)
