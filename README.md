# tenzies

Tenzies is a game where the user has to "lock" the value in several dices, and in order to win all of them should present the same value. Upon winning the game the user receives a feedback seeing falling confettis.

## The project

This small project was created to exercise the "frontend muscles". Using Typescript to implicitly define types and function returns and classic css and mostly flex display.

## Logic

### Game start logic

At the start of the game the game generates an Array with 10 objects with "value, isHeld, id" values

![generateDice](./readme%20images/generateDice.jpg)

### Rendering dices

From the list of dice Dice objects the map function create a set of button.dice and appropriate values are set and rendered in the tag

![diceElements](./readme%20images/diceElements.jpg)

### Game states

useState is rerendered in 2 instances, whenever the "dice" list is updated and when the "gameWon" value changes.

### Game ending

Game is won when all the buttons have the same value

![gamewon](./readme%20images/game%20won.jpg)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
