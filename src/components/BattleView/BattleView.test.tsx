import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BattleView from "./BattleView";
import { PokemonProvider, usePokemon } from "../../context/PokemonContext";

jest.mock("../../context/PokemonContext", () => ({
  ...jest.requireActual("../../context/PokemonContext"),
  usePokemon: jest.fn(),
}));

describe("BattleView", () => {
  const mockFetchPokemonByName = jest.fn();
  const mockSetPokemon1 = jest.fn();
  const mockSetPokemon2 = jest.fn();
  const mockStartBattle = jest.fn();

  beforeEach(() => {
    (usePokemon as jest.Mock).mockReturnValue({
      pokemon1: {
        name: "test1",
        sprites: { front_default: "test" },
        moves: [],
      },
      pokemon2: {
        name: "test2",
        sprites: { front_default: "test" },
        moves: [],
      },
      setPokemon1: mockSetPokemon1,
      setPokemon2: mockSetPokemon2,
      fetchPokemonByName: mockFetchPokemonByName,
      startBattle: mockStartBattle,
      battleLog: "",
      attack1: { name: "test1", power: 40 },
      attack2: { name: "test2", power: 45 },
    });
  });

  test("renders Pokémon names from context", () => {
    render(
      <PokemonProvider>
        <BattleView />
      </PokemonProvider>
    );
    expect(screen.getByText("test1")).toBeInTheDocument();
    expect(screen.getByText("test2")).toBeInTheDocument();
  });

  test("checks start battle button enabled/disabled state", () => {
    (usePokemon as jest.Mock).mockReturnValue({
      pokemon1: null,
      pokemon2: null,
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
        <BattleView />
      </PokemonProvider>
    );

    const startBattleButton = screen.getByText(
      "Start Battle!"
    ) as HTMLButtonElement;
    expect(startBattleButton).toBeDisabled();
  });

  test("start battle triggers startBattle function", () => {
    render(
      <PokemonProvider>
        <BattleView />
      </PokemonProvider>
    );

    const startBattleButton = screen.getByText("Start Battle!");
    fireEvent.click(startBattleButton);
    expect(mockStartBattle).toHaveBeenCalled();
  });
});
