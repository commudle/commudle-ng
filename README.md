![Commudle Logo](https://commudle.com/assets/images/commudle-logo152.png)

# [Commudle](https://commudle.com)
### This is a community management platform for Tech Communities across the world. The inspiration being the personal experiences of Community Organizers. 🔆
### With Commudle, Manage your Tech Community,
### Organize Events, Learn & Grow, together. 💻

## Why Commudle?
There are about 26.4 million software developers in the world. And that's just the estimate for professionals.
And one of the huge sources of motivation and learning for these Developers is Tech Communities in their region, and beyond. Commudle is a platform to provide for all these Communities and Developers. We aim to provide a platform where all the amazing content, ranging from slides, to sessions (even links to those) are all at one place. We want to know what those amazing side projects you have built, even if it's yet to be given those finishing touches.


## Main features of Commudle
- ### Communities
   - You can connect with Developers across the world who are learning and building together. Here are some of the most active communities!
- ### Labs 👩‍💻👨‍💻
   - A place where you will find tutorials created by everyone who learnt something new and wants to make it easy for others to learn too!
- ### Community Builds 💡
   - From coding a small, simple and useful Project, to Slides which you used for a Talk, share something which is your Build!


## To setup commudle on your local machine
- Install Node.js and npm (at least version 13 of Node.js and at least version 6 of npm)
- Install [@angular/cli](https://cli.angular.io/)
- Clone the project. `git clone https://github.com/commudle/commudle-ng`
- Run `npm install`.
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
- The development server directly interacts with the production APIs.


## Login/Sign Up for Development
- Go to `https://auther.commudle.com`.
- Sign in using your **Google Account** (Other options will be added soon).
- Navigate to `http://localhost:4200/` and you should get signed in automatically.
- If the above step does not sign you in, then:
  - Go to `https://commudle.com` where you should be signed in.
  - Open the developer tools of your respective browser.
  - Navigate to the *Application* Tab.
  - In the left side navigation bar, under *Storage* you can find *Cookies*.
  - By clicking on it, you can find a cookie named **commudle_user_auth** with its corresponding value.
  - Copy this particular cookie and its value to `http://localhost:4200`'s cookies and refresh the page to get signed in.
  

### To Contribute to Commudle, checkout 🔭
  - [Contribution Guidelines](CONTRIBUTING.md)
  - [Contributors.md](CONTRIBUTORS.md)
  - [Code Of Conduct](CODE_OF_CONDUCT.md)
  

## Build for production
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Design Framework / UI Kit 🎨🖌️
- We are using [Nebular](https://akveo.github.io/nebular/) which uses [Eva Design System](https://eva.design/) in commudle-admin
