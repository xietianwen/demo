# JasonProjectV1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


1)npm install -g @angular/cli
2)ng new jason-project-v1 => routing ok
3)ng generate component mouvement-list
4)ng generate component page-not-found
5)update file app/app-routing.module.ts

    const appRoutes: Routes = [
    { path: 'crisis-center', component: CrisisListComponent },
    { path: 'heroes',        component: HeroListComponent },
    { path: 'heroes',        component: HeroListComponent },
    { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
    ];
    imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],

6)ng generate module mouvements/mouvements --module app --flat --routing
7)ng generate class mouvements/Mouvement
8)ng generate service mouvements/mouvement
9)add mouvements/mock-mouvements.ts
10)ng generate service common/services/message
11)ng generate component mouvements/mouvement-detail
###auth & login
12)ng generate guard auth/auth
13)ng generate service auth/auth
14)ng generate component auth/login
15)ng generate module auth/auth --module app --flat --routing
16)ng generate service mouvements/mouvement-detail/mouvement-detail-resolve
17)ng generate service common/services/offlineDB
18)ng generate component  mouvements/mouvement-edit
19)ng generate service common/services/share
20)http-server -p 8080 -c-1 dist/jason-project-v1
21)ng generate service common/services/DB
22)ng generate service common/services/onlineDB
23)Azure config for node.js
    1.=> To check the available runtime versions for your app, Goto Kudu console -> Runtime versions
    The Node.js versions provided by Azure are constantly updated. Unless otherwise specified, the default version that is specified in the WEBSITE_NODE_DEFAULT_VERSION environment variable will be used.
    2.=> specify the WEBSITE_NODE_DEFAULT_VERSION as 8.9.0 under ‘Application settings’ and check if that resolves the issue.
    3.=> Kudu console => node -v
    4.=>    



