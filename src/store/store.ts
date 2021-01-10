import { action, computed, observable } from 'mobx';
import { IMovies } from '../models';
import { makeCallToApi } from '../utils';

class MoviesStore {
  @observable
  private _movies: IMovies[] = [];

  @computed
  public get movies() {
    return this._movies;
  }

  @action
  public getMovies(param: string) {
    return makeCallToApi(param).then((data) => {
      this._movies = [...this._movies, data];
      console.log(this._movies);
    });
  }
}

export const moviesStore = new MoviesStore();
