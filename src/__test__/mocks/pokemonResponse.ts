import { Pokemon } from "../../redux/api/models/Pokemon";
import { PaginatedResponse } from "../../redux/api/pokemonApi";

export const pokemonResponse: PaginatedResponse<Pokemon> = {
  count: 2,
  next: "next_url",
  previous: "prev_url",
  results: [
    {
      height: 7,
      id: 1,
      name: "bulbasaur",
      order: 1,

      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          },
        },
      },
      stats: [
        {
          base_stat: 45,
          effort: 0,
          stat: {
            name: "hp",
          },
        },
        {
          base_stat: 49,
          effort: 0,
          stat: {
            name: "attack",
          },
        },
        {
          base_stat: 49,
          effort: 0,
          stat: {
            name: "defense",
          },
        },
        {
          base_stat: 65,
          effort: 1,
          stat: {
            name: "special-attack",
          },
        },
        {
          base_stat: 65,
          effort: 0,
          stat: {
            name: "special-defense",
          },
        },
        {
          base_stat: 45,
          effort: 0,
          stat: {
            name: "speed",
          },
        },
      ],
      types: [
        {
          slot: 1,
          type: {
            name: "grass",
          },
        },
        {
          slot: 2,
          type: {
            name: "poison",
          },
        },
      ],
      weight: 69,
    },
    {
      height: 10,
      id: 2,
      name: "ivysaur",
      order: 2,
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",

        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
          },
        },
      },
      stats: [
        {
          base_stat: 60,
          effort: 0,
          stat: {
            name: "hp",
          },
        },
        {
          base_stat: 62,
          effort: 0,
          stat: {
            name: "attack",
          },
        },
        {
          base_stat: 63,
          effort: 0,
          stat: {
            name: "defense",
          },
        },
        {
          base_stat: 80,
          effort: 1,
          stat: {
            name: "special-attack",
          },
        },
        {
          base_stat: 80,
          effort: 1,
          stat: {
            name: "special-defense",
          },
        },
        {
          base_stat: 60,
          effort: 0,
          stat: {
            name: "speed",
          },
        },
      ],
      types: [
        {
          slot: 1,
          type: {
            name: "grass",
          },
        },
        {
          slot: 2,
          type: {
            name: "poison",
          },
        },
      ],
      weight: 130,
    },
  ],
};
