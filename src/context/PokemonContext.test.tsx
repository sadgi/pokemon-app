import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PokemonProvider, usePokemon } from "./PokemonContext";

jest.mock("./PokemonContext", () => ({
  ...jest.requireActual("./PokemonContext"),
  usePokemon: jest.fn(),
}));

const mockFetchPokemonByName = jest.fn();
const mockSetPokemon1 = jest.fn();
const mockSetPokemon2 = jest.fn();
const mockStartBattle = jest.fn();

describe("PokemonContext", () => {
  beforeEach(() => {
    (usePokemon as jest.Mock).mockReturnValue({
      pokemon1: {
        name: "Pokemon1",
        sprites: { front_default: "test" },
        moves: [],
      },
      pokemon2: {
        name: "Pokemon2",
        sprites: { front_default: "test" },
        moves: [],
      },
      setPokemon1: mockSetPokemon1,
      setPokemon2: mockSetPokemon2,
      fetchPokemonByName: mockFetchPokemonByName,
      startBattle: mockStartBattle,
      battleLog: "",
      attack1: { name: "Atatck1", power: 10 },
      attack2: { name: "Attack2", power: 20 },
    });
  });

  test("renders pokemon1 and pokemon2 names from context", () => {
    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    expect(screen.getByText("Pokemon 1: Pokemon1")).toBeInTheDocument();
    expect(screen.getByText("Pokemon 2: Pokemon2")).toBeInTheDocument();
  });

  test("should update pokemon1 and pokemon2 when setPokemon is called", () => {
    (usePokemon as jest.Mock).mockReturnValue({
      pokemon1: {
        name: "PokemonTest1",
        sprites: { front_default: "" },
        moves: [],
      },
      pokemon2: {
        name: "PokemonTest2",
        sprites: { front_default: "" },
        moves: [],
      },
      setPokemon1: mockSetPokemon1,
      setPokemon2: mockSetPokemon2,
      fetchPokemonByName: mockFetchPokemonByName,
      startBattle: mockStartBattle,
      battleLog: "",
      attack1: null,
      attack2: null,
    });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    expect(screen.getByText("Pokemon 1: PokemonTest1")).toBeInTheDocument();
    expect(screen.getByText("Pokemon 2: PokemonTest2")).toBeInTheDocument();
  });

  test("should call startBattle function when button clicked", () => {
    render(
      <PokemonProvider>
        <BattleComponent />
      </PokemonProvider>
    );

    const startBattleButton = screen.getByText("Start Battle!");
    fireEvent.click(startBattleButton);

    expect(mockStartBattle).toHaveBeenCalled();
  });

  test("should call fetchPokemonByName function at initial render", async () => {
    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );
    const startBattleButton = screen.getByText("Fetch Pokemon");
    fireEvent.click(startBattleButton);
    expect(mockFetchPokemonByName).toHaveBeenCalledWith("pokemon1");
  });
});

function TestComponent() {
  const { pokemon1, pokemon2, setPokemon1, setPokemon2, fetchPokemonByName } =
    usePokemon();
  const updatePokemon = () => {
    setPokemon1({
      name: "Pokemon3",
      sprites: { front_default: "" },
      moves: [],
    });
    setPokemon2({
      name: "Pokemon4",
      sprites: { front_default: "" },
      moves: [],
    });
  };

  const fetchPokemon = async () => {
    const poke1 = await fetchPokemonByName("pokemon1");
    setPokemon1(poke1);
  };

  return (
    <div>
      <div>Pokemon 1: {pokemon1 ? pokemon1.name : "null"}</div>
      <div>Pokemon 2: {pokemon2 ? pokemon2.name : "null"}</div>
      <button onClick={updatePokemon}>Update Pokemon</button>
      <button onClick={fetchPokemon}>Fetch Pokemon</button>
    </div>
  );
}

function BattleComponent() {
  const { startBattle } = usePokemon();
  return <button onClick={startBattle}>Start Battle!</button>;
}
