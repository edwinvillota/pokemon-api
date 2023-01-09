export type PokemonSprites = {
  front_default: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  order: number;
  weight: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
};

export type PokemonItem = {
  name: string;
  url: string;
};
