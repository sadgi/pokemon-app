import React, { useEffect } from "react";
import { usePokemon } from "../../context/PokemonContext";
import "./BattleView.css";

const BattleView: React.FC = () => {
  const {
    pokemon1,
    setPokemon1,
    pokemon2,
    setPokemon2,
    fetchPokemonByName,
    startBattle,
    battleLog,
    attack1,
    attack2,
  } = usePokemon();

  useEffect(() => {
    const fetchPokemon = async () => {
      //name for pokemon to extract their details through API name is choosen randomly from this list for battle
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await response.json();
      const pokemonList = data.results.map((pokemon:{name:string,  url: string}) => pokemon.name);

      const getRandomPokemonName = (excludeName?: string) => {
        const filteredList = excludeName
          ? pokemonList.filter((name :string) => name !== excludeName)
          : pokemonList;
        return filteredList[Math.floor(Math.random() * filteredList.length)];
      };

      const poke1Name = getRandomPokemonName();
      const poke2Name = getRandomPokemonName(poke1Name);

      //fetch pokemon details from API using their name
      const poke1 = await fetchPokemonByName(poke1Name);
      const poke2 = await fetchPokemonByName(poke2Name);

      setPokemon1(poke1);
      setPokemon2(poke2);
    };
    fetchPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="battle-screen">
      <div className="battle-container">
        <div className="pokemon-section">
          {pokemon1 && (
            <div className="pokemon-card-container">
              <div className="pokemon-card triangle-right">
                <h2 className="pokemon-name">{pokemon1.name}</h2>
                {attack1 && (
                  <div className="pokemon-move">
                    <span className="attack-pill pokemon1">
                      {attack1.name}: {attack1.power}
                    </span>
                  </div>
                )}
              </div>
              <img
                className="pokemon-sprite right"
                src={pokemon1.sprites.front_default}
                alt={pokemon1.name}
              />
            </div>
          )}
          {pokemon2 && (
            <div className="pokemon-card-container">
              <img
                className="pokemon-sprite left"
                src={pokemon2.sprites.front_default}
                alt={pokemon2.name}
              />
              <div className="pokemon-card triangle-left">
                <h2 className="pokemon-name">{pokemon2.name}</h2>
                {attack2 && (
                  <div className="pokemon-move">
                    <span className="attack-pill pokemon2">
                      {attack2.name}: {attack2.power}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="battle-log-section">
          <h3>Battle Log</h3>

          <div className="battle-log-content">
            <textarea className="battle-log" readOnly value={battleLog} />
            <button
              className="battle-button"
              onClick={startBattle}
              disabled={!pokemon1 || !pokemon2}
            >
              Start Battle!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleView;
