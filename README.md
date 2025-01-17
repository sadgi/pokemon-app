# Getting Started with Create React App

This project was bootstrapped with Create React App and is a fun web application where you can simulate a Pokemon battle. The app fetches Pokemon data from PokeAPI and simulates a battle between two Pokemon, comparing their randomly selected moves and displaying the outcome.The application is thoroughly tested using unit tests to ensure each component functions correctly

# Features

Pokemon Selection: Choose two Pokemon to battle from the PokeAPI.
Random Move Generation: Pokemon will use a random move with an associated power, which will be compared during the battle.
Battle Outcome: The battle outcome is determined by comparing the power of both Pokemon's moves.
Battle Log: A real-time log of the battle's progression and results.
Responsive Design: Optimized for different screen sizes.

# Technologies Used

React: For building the user interface.
React Context API: For managing shared state in the app.
TypeScript: For providing type safety.
PokeAPI: For fetching Pokemon data and moves.
Jest and React Testing Library: For unit and integration testing.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
