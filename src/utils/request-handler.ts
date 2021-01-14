// const siteKey = `${process.env.API_KEY}`;

const requestUrl = `http://www.omdbapi.com/`;

type QueryType = 'title' | 'id' | 'search';

function checkQueryType(queryType: QueryType): string {
  let param: string;

  if (queryType === 'id') {
    param = `i=`;
  } else if (queryType === 'title') {
    param = `t=`;
  } else {
    param = `s=`;
  }

  return param;
}

// makeCallToApi takes a param that gets appended to the url.
// param is the query parameter
export function makeCallToApi(
  param: string,
  queryType: QueryType = 'title'
): Promise<any> {
  const query = checkQueryType(queryType) + param;

  return fetch(`
  ${requestUrl}?apikey=${process.env.REACT_APP_API_KEY}&${query}
   `)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
}
