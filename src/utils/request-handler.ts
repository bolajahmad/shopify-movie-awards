// const siteKey = `${process.env.API_KEY}`;

import { IMovies } from '../models';
const requestUrl = `http://omdbapi.com/`;

// makeCallToApi takes a param that gets appended to the url.
// param is the query parameter
export function makeCallToApi(param: string): Promise<IMovies> {
  return fetch(`
  ${requestUrl}?apikey=${11978928}&${param}
   `).then((response) => response.json());
}
