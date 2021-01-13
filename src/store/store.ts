import { action, computed, observable } from 'mobx';
import { IMovies, ISearchResult } from '../models';
import { makeCallToApi } from '../utils';

class MoviesStore {
  @observable
  private _movies: IMovies[] = [];

  @observable
  private _searchResult?: ISearchResult[];

  @observable
  private _nominations: string[] = [];

  @computed
  public get movies() {
    return this._movies;
  }

  @computed
  public get searchResult() {
    return this._searchResult;
  }

  @computed
  public get nominations() {
    return this._nominations;
  }

  @action
  public getMovies(param: string) {
    return makeCallToApi(param).then((data) => {
      console.log(data);
      this._movies = [data as IMovies];
      console.log(this._movies);
    });
  }

  @action
  public searchMovies(param: string) {
    return makeCallToApi(param, 'search').then((data) => {
      console.log(data.search);
      this._searchResult = data.Search as ISearchResult[];
      console.log(this._searchResult);

      return this._searchResult;
    });
  }

  @action
  public addNomination(id: string) {
    const idExists = this._nominations.findIndex((nom) => nom === id) as number;
    console.log(idExists);

    if (idExists !== -1) {
      this._nominations.splice(idExists, 1);
      console.log(this._nominations);

      return this._nominations;
    }

    this._nominations.push(id);
    console.log(this._nominations);

    return this._nominations;
  }
}

export const moviesStore = new MoviesStore();
