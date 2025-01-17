import React from "react";
import { PokemonProvider } from "./context/PokemonContext";
import BattleView from "./components/BattleView/BattleView";
import "./App.css";

function App() {
  return (
    <PokemonProvider>
      <div className="App">
        <h1>Pokemon Battle</h1>
        <BattleView />
      </div>
    </PokemonProvider>
  );
}

export default App;
