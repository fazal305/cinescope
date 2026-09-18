// MOCK BACKEND DATA — for local UI development only.
//
// This simulates what a backend response MIGHT look like, using an
// arbitrary field-naming convention (movie_id, movie_title, ...) that is
// deliberately different from the frontend model, so the normalizer in
// utils/movieMappers.js has something real to translate. It is NOT the
// teacher's actual API contract, which is still TBD — see API-CONTRACT.md.
//
// A few entries deliberately omit poster_path, overview, cast_list, or
// review_list so the app's missing-data states are exercised honestly
// instead of only ever showing the happy path.

import posterAmber from '../assets/mock-posters/poster-amber.svg'
import posterSlate from '../assets/mock-posters/poster-slate.svg'
import posterCrimson from '../assets/mock-posters/poster-crimson.svg'

export const MOCK_MOVIES = [
  {
    movie_id: '1',
    movie_title: 'Inception',
    year: 2010,
    poster_path: posterSlate,
    vote_average: 8.4,
    backdrop_path: null,
    overview:
      'A thief who steals corporate secrets through dream-sharing technology is given a chance to have his criminal history erased in exchange for planting an idea in a target\'s mind.',
    genre_list: ['Sci-Fi', 'Thriller'],
    runtime_minutes: 148,
    cast_list: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    review_list: [
      { author: 'demo_user_1', text: 'Rewatched this three times and still catch new details.' },
      { author: 'demo_user_2', text: 'The score alone is worth the runtime.' },
    ],
  },
  {
    movie_id: '2',
    movie_title: 'Parasite',
    year: 2019,
    poster_path: posterCrimson,
    vote_average: 8.5,
    backdrop_path: null,
    overview:
      'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    genre_list: ['Drama', 'Thriller'],
    runtime_minutes: 132,
    cast_list: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
    review_list: [
      { author: 'demo_user_3', text: 'Every rewatch reveals a new layer of foreshadowing.' },
    ],
  },
  {
    movie_id: '3',
    movie_title: 'Everything Everywhere All at Once',
    year: 2022,
    poster_path: posterAmber,
    vote_average: 8.1,
    backdrop_path: null,
    overview:
      'An exhausted laundromat owner is swept into a multiverse-spanning adventure to save reality from a chaotic force threatening to unravel it.',
    genre_list: ['Sci-Fi', 'Comedy', 'Drama'],
    runtime_minutes: 140,
    cast_list: ['Michelle Yeoh', 'Ke Huy Quan', 'Stephanie Hsu'],
    review_list: [],
  },
  {
    movie_id: '4',
    movie_title: 'The Grand Budapest Hotel',
    year: 2014,
    poster_path: posterSlate,
    vote_average: 8.1,
    backdrop_path: null,
    overview:
      'The adventures of a legendary concierge at a famous European hotel between the two World Wars and the lobby boy who becomes his trusted friend.',
    genre_list: ['Comedy', 'Drama'],
    runtime_minutes: 99,
    cast_list: ['Ralph Fiennes', 'Tony Revolori', 'Saoirse Ronan'],
    review_list: [
      { author: 'demo_user_4', text: 'Every frame looks like it belongs in a museum.' },
    ],
  },
  {
    movie_id: '5',
    movie_title: 'Interstellar',
    year: 2014,
    poster_path: null,
    vote_average: 8.6,
    backdrop_path: null,
    overview:
      'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    genre_list: ['Sci-Fi', 'Drama'],
    runtime_minutes: 169,
    cast_list: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    review_list: [
      { author: 'demo_user_5', text: 'Brought a spreadsheet of wormhole theories to the theater. No regrets.' },
    ],
  },
  {
    movie_id: '6',
    movie_title: 'Spirited Away',
    year: 2001,
    poster_path: posterCrimson,
    vote_average: 8.6,
    backdrop_path: null,
    overview:
      'During her family\'s move to the suburbs, a sullen ten-year-old girl wanders into a world ruled by gods, witches, and spirits.',
    genre_list: ['Animation', 'Fantasy'],
    runtime_minutes: 125,
    cast_list: ['Rumi Hiiragi', 'Miyu Irino'],
    review_list: [],
  },
  {
    movie_id: '7',
    movie_title: 'Mad Max: Fury Road',
    year: 2015,
    poster_path: 'https://example.com/broken-poster-path.jpg',
    vote_average: 8.1,
    backdrop_path: null,
    overview:
      'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of a group of female prisoners.',
    genre_list: ['Action', 'Adventure'],
    runtime_minutes: 120,
    cast_list: ['Tom Hardy', 'Charlize Theron'],
    review_list: [
      { author: 'demo_user_6', text: 'Practically one continuous chase and it never drags.' },
    ],
  },
  {
    movie_id: '8',
    movie_title: 'Whiplash',
    year: 2014,
    poster_path: posterAmber,
    vote_average: 8.4,
    backdrop_path: null,
    overview: null,
    genre_list: ['Drama', 'Music'],
    runtime_minutes: 106,
    cast_list: [],
    review_list: [],
  },
  {
    movie_id: '9',
    movie_title: 'The Shape of Water',
    year: 2017,
    poster_path: posterSlate,
    vote_average: 7.3,
    backdrop_path: null,
    overview:
      'At a top-secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature held in captivity.',
    genre_list: ['Fantasy', 'Drama'],
    runtime_minutes: 123,
    cast_list: ['Sally Hawkins', 'Michael Shannon', 'Richard Jenkins'],
    review_list: [
      { author: 'demo_user_7', text: 'Stranger than I expected, in the best way.' },
    ],
  },
  {
    movie_id: '10',
    movie_title: 'Knives Out',
    year: 2019,
    poster_path: posterCrimson,
    vote_average: 7.9,
    backdrop_path: null,
    overview:
      'A detective investigates the death of a patriarch of an eccentric, combative family.',
    genre_list: ['Mystery', 'Comedy'],
    runtime_minutes: 130,
    cast_list: ['Daniel Craig', 'Ana de Armas', 'Chris Evans'],
    review_list: [],
  },
]
