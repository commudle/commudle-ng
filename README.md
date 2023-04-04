![Commudle Logo](https://commudle.com/assets/images/commudle-logo152.png)

# Commudle

[www.commudle.com](https://commudle.com)

This is a community management platform for Tech Communities across the world. The inspiration being the personal
experiences of Community Organizers.

## To setup

- Install Node.js and npm (at least version 13 of Node.js and at least version 6 of npm)
- Install [@angular/cli](https://cli.angular.io/)
- Clone the project.
- Run `npm ci`.
- Run `npx nx run commudle-admin:serve` for a dev server. Navigate to `http://localhost:4200/`.
- The development server directly interacts with the production APIs.


## To create new components, service and interface

- For Component  Run `npx nx g @nrwl/angular:component <component-name>`
- For Service  Run `npx nx g @nrwl/angular:service <service-name>`
- For Interface  Run `npx nx g @nrwl/angular:interface <interface-name>`
## Login/Sign Up for Development

- Go to `http://localhost:4200/login`
- Sign in using your **Google Account** or **By enter your email address** (Other options will be added soon).
- Now you are sign in successfully.
  - [Contribution Guidelines](CONTRIBUTING.md)
  - [Contributors.md](CONTRIBUTORS.md)
  - [Code Of Conduct](CODE_OF_CONDUCT.md)

## Build for production

- Run `npx nx reset` to clear cache.
- Run `npx nx run prerender:release` to build the project. The build artifacts will be stored in the `prod-server.zip` file.

## Design Framework / UI Kit

- We are using [Nebular](https://akveo.github.io/nebular/) which uses [Eva Design System](https://eva.design/) in
  commudle-admin
