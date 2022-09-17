# a-web-excercise

This is a web exercise

## Project Setup

* Clone the repository
* Run `npm install`
* Run `npm run dev` | `npm run build`
* Open `http://localhost:5173` in your browser

## Excercise Assignment

> "Cilem je vytvorit jednoduchou aplikaci **Kamen, nuzky, papir**
>
> Detail zadani:
> Hraci mezi sebou budou hrat znamou hru, a to tak, ze kazdy s kazdym. Informace o hracich se daji natahnout z nasledujici adresy - <https://jsonplaceholder.typicode.com/users>
>
> Vznikne stranka, kde budou proti sobe stat 2 hraci, to bude simulovano pomoci ikony a selectem, pomoci ktereho se vybere ze seznamu hracu konretni hrac.
> Pod tim bude tlacitko, ktere spusti hru mezi zvolenymi hraci, ti maji 3 pokusy (3 hry) na to, aby se urcil, kdo mezi zvolneymi hraci je vitez.
> Vitez se zapise do score-boardu (tabulky), ktery bude usmiten ve spodu stranky
>
> Doplnujici podminky:
> Hru by mel odehrat kazdy s kazdym, kdy se nesmi stat, ze 2 zvoleni hraci mohou hrat hru znova
> Score-board by mel byt serazen od nejlepsiho hrace (podle poctu jeho vyhranych her)
>
> Pouzite technologie:
> **vuejs** (verze 3, composition api)
> **css** (bootstrap - getbootstrap.com nebo quasar - quasar.dev)
>
> Casova narocnost: cca 3-4 hod
>
> (zadani neni zamerne plne vyspecifikovane...)"

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
