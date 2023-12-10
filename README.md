# wordle-helper
##  Description
wordle-helper is a web application I built using React that helps you solve the Wordle by letting you know how many possible words there are left and suggesting the best words for you to guess next. The actual Wordle solving logic is from my [nyt-wordle-solver](https://github.com/JakubGV/nyt-wordle-solver) project in Python. I rewrote that logic into [TypeScript](./src/logic/WordleSolver.tsx) for this project.

The web application is [accessible](https://jakubgvogel.com/wordle-helper/) on GitHub pages.

## Installing and Running
This project was built using [React](https://reactjs.org/). The dependencies for React are well documented but include Node.js, to be able to locally run JavaScript, and npm, a package manager. Specific dependencies can be installed using npm, with a command to `npm install` installing all the required packages described in [package.json](./package.json).

The project is deployed to Github pages by running `npm run deploy` in a git terminal.

## Using the Project
Type in the word you guessed, select the letter until it is the right color, and press enter to see the amount of words left and the suggested top 10 words to guess!

## What I learned
* Designing web applications for both mobile and desktop
* Using only functional components since React seems to be favoring this
* Familiarizing myself with useState, useEffect, etc.
* Passing state setters as props
* Managing re-renders and ensuring re-renders occurr when necessary

## Credits
I have nothing to do with the New York Times or the Wordle game. I made this project as a fun way to develop my web dev skills and be able to share a cool project with my friends!