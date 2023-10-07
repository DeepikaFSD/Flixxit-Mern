import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { TMDB_BASE_URL, API_KEY } from '../utils/constants.js';

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

//get genres from api
export const getGenres = createAsyncThunk('flixxit/generes', async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

//create movies array
const createRawDataArray = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

//get movies from api
const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ''}`);
    createRawDataArray(results, moviesArray, genres);
  }
  return moviesArray;
};

//return movies from tmdb api
export const fetchMovies = createAsyncThunk(
  'flixxit/trending',
  async ({ type }, thunkApi) => {
    const {
      flixxit: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

//return movies for selected genres
export const fetchMoviesByGenre = createAsyncThunk(
  'flixxit/genre',
  async ({ genre, type }, thunkApi) => {
    const {
      flixxit: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

//getliked movies from database
export const getLikedMovies = createAsyncThunk(
  'flixxit/getLiked',
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`https://flixxit-server-e700.onrender.com/api/user/liked/${email}`);
    return movies;
  }
);

//delete movie from database
export const deleteLikedMovies = createAsyncThunk(
  'flixxit/deleteLikedMovie',
  async ({ email, movieId }) => {
    const {
      data: { movies },
    } = await axios.put('https://flixxit-server-e700.onrender.com/api/user/remove', {
      email,
      movieId,
    });
    return movies;
  }
);

const FlixxitSlice = createSlice({
  name: 'Flixxit',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(deleteLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    flixxit: FlixxitSlice.reducer,
  },
});
