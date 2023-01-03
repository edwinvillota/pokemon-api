import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPokemon } from "../../redux/features/pokemon/pokemonSlice";

export const Home = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  return <h1>Test</h1>;
};
