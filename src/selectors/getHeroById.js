import { heroes } from "../data/heroes";

export const getHeroeById = (id) => {
  return heroes.filter((hero) => hero.id === id);
};
