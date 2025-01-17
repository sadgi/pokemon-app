import React, { createContext, useContext, useState } from "react";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  moves: { move: { name: string } }[];
}

interface Move {
  power: number;
  name: string;
}
type SetState<Pokemon> = (
  value: Pokemon | null | ((prevState: Pokemon | null) => Pokemon | null)
) => void;

interface PokemonContextType {
  pokemon1: Pokemon | null;
  pokemon2: Pokemon | null;
  battleLog: string;
  attack1: Move | null;
  attack2: Move | null;
  fetchPokemonByName: (name: string) => Promise<Pokemon>;
  fetchMove: (moveName: string) => Promise<Move>;
  setPokemon1: SetState<Pokemon | null>;
  setPokemon2: SetState<Pokemon | null>;
  startBattle: () => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
  const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);
  const [battleLog, setBattleLog] = useState<string>("");
  const [attack1, setAttack1] = useState<Move | null>(null);
  const [attack2, setAttack2] = useState<Move | null>(null);

  const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.json();
  };

  const fetchMove = async (moveName: string): Promise<Move> => {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
    const data = await response.json();
    return { name: data.name, power: data.power || 0 };
  };

  const startBattle = async () => {
    if (!pokemon1 || !pokemon2) return;

    const attack1 = await getRandomAttack(pokemon1);
    const attack2 = await getRandomAttack(pokemon2);

    setAttack1(attack1);
    setAttack2(attack2);

    if (attack1.power > attack2.power) {
      setBattleLog(
        `${pokemon1.name} lands a decisive blow with ${attack1.name}, knocking out ${pokemon2.name}!`
      );
    } else if (attack2.power > attack1.power) {
      setBattleLog(
        `${pokemon2.name} lands a decisive blow with ${attack2.name}, knocking out ${pokemon1.name}!`
      );
    } else {
      setBattleLog("Draw");
    }
  };

  const getRandomAttack = async (pokemon: Pokemon) => {
    const randomMove =
      pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].move;
    return await fetchMove(randomMove.name);
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemon1,
        setPokemon1,
        pokemon2,
        setPokemon2,
        fetchPokemonByName,
        fetchMove,
        startBattle,
        battleLog,
        attack1,
        attack2,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("Context must be used within a PokemonProvider");
  }
  return context;
};
