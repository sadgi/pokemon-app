import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { PokemonProvider, usePokemon } from "./context/PokemonContext"; // Import the provider

jest.mock("./context/PokemonContext", () => ({
  ...jest.requireActual("./context/PokemonContext"),
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

  test("renders title App", () => {
    render(
      <PokemonProvider>
        <App />
      </PokemonProvider>
    );
    const linkElement = screen.getByText("Pokemon Battle");
    expect(linkElement).toBeInTheDocument();
  });
});
