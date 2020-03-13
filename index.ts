import fetch, { Response } from 'node-fetch';

const promisedStarWarsAPI = (url: string) => {
  return fetch(url)
    .then((res: Response) => res.json())
    .then((json: Object) => console.log(json))
    .catch((err: Error) => console.log(err.message))
    .finally(() => console.log('done'));
};

const fetchStarWarsAPI = async (url: string) => {
  try {
    const res = await fetch(url);
    const json = await res.json();

    return json;
    // const homeworld = await fetch(json.homeworld);
    // const homeworldJson = await homeworld.json();
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

const fetchArray = async (urls: string[]) => {
  return await Promise.all(urls.map((url: string) => fetchStarWarsAPI(url)));
};

const getAll = async (personURL: string) => {
  const person = await fetchStarWarsAPI(personURL);
  // const homeworld = await fetchStarWarsAPI(person.homeworld);
  // const starships = await fetchArray(person.starships);

  const [homeworld, starships, vehicles] = await Promise.all([
    fetchStarWarsAPI(person.homeworld),
    fetchArray(person.starships),
    fetchArray(person.vehicles)
  ]);

  // const starships = [];
  // for (const starshipURL of person.starships) {
  //   const starship = await fetchStarWarsAPI(starshipURL);
  //   starships.push(starship);
  // }

  console.log({
    person,
    homeworld,
    starships,
    vehicles
  });
};

getAll(`https://swapi.co/api/people/1`);
