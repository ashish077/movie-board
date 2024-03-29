import React from 'react';
import "./main.css";
import Navigation from "./nav/nav.js";
import Movies from "./movies/movie.js";
class Main extends React.Component{
  state = {
    page: 1,
    total_pages: 1,

    movies:[],
   url: `https://api.themoviedb.org/3/genre/movie/list?api_key=a876ce0b2f8bc8695a6fc0998f6f1a28&language=en-US`,
   moviesUrl: `https://api.themoviedb.org/3/discover/movie?api_key=a876ce0b2f8bc8695a6fc0998f6f1a28&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,

   genre: "Comedy",
   genres: [],
   year: {
     label: "year",
     min: 1990,
     max: 2017,
     step: 1,
     value: { min: 2000, max: 2017 }
   },
   rating: {
     label: "rating",
     min: 0,
     max: 10,
     step: 1,
     value: { min: 8, max: 10 }
   },
   runtime: {
     label: "runtime",
     min: 0,
     max: 300,
     step: 15,
     value: { min: 60, max: 120 }
   }
 }

 componentDidMount() {
  this.fetchMovies(this.state.moviesUrl);
}


 onGenreChange = event => {
   this.setState({ genre: event.target.value });
 }

 setGenres = genres => {
   this.setState({genres});
 }

 onChange = data => {
   this.setState({
     [data.type]: {
       ...this.state[data.type],
       value: data.value
     }
   });
 };
 generateUrl = () => {
   const {genres, year, rating, runtime,page } = this.state;
   const selectedGenre = genres.find( genre => genre.name === this.state.genre);
   const genreId = selectedGenre.id;

   const moviesUrl = `https://api.themoviedb.org/3/discover/movie?` +
     `api_key=a876ce0b2f8bc8695a6fc0998f6f1a28&` +
     `language=en-US&sort_by=popularity.desc&` +
     `with_genres=${genreId}&` +
     `primary_release_date.gte=${year.value.min}-01-01&` +
     `primary_release_date.lte=${year.value.max}-12-31&` +
     `vote_average.gte=${rating.value.min}&` +
     `vote_average.lte=${rating.value.max}&` +
     `with_runtime.gte=${runtime.value.min}&` +
     `with_runtime.lte=${runtime.value.max}&` +
     `page=1&`;

   this.setState({moviesUrl});
 }

 onSearchButtonClick = () => {
   this.generateUrl();
 }

 fetchMovies = (url) => {
   fetch(url)
     .then(response => response.json())
     .then(data => this.storeMovies(data))
     .catch(error => console.log(error));
 }

 storeMovies = data => {
   const movies = data.results.map(result => {
     const {
       vote_count,
       id,
       genre_ids,
       poster_path,
       title,
       vote_average,
       release_date
     } = result;
     return { vote_count, id, genre_ids, poster_path, title, vote_average, release_date };
   });


   this.setState({ movies,total_pages:data.total_pages });
 };
 onPageIncrease = () => {
  const { page, total_pages } = this.state;
  const nextPage = page + 1;
  if (nextPage <= total_pages) {
    this.setState({ page: nextPage })
  }
}

onPageDecrease = () => {
  const { page, total_pages } = this.state;

  const nextPage = page - 1;
  if ( nextPage > 0 ) {
    this.setState({ page: nextPage })
  }
}
componentWillUpdate(nextProps, nextState) {
  if (this.state.moviesUrl !== nextState.moviesUrl) {
    this.fetchMovies(nextState.moviesUrl);
  }
  if (this.state.page !== nextState.page) {
    this.generateUrl();
  }
}

render(){
  return(
    <div className="main">
      <Navigation
           onChange={this.onChange}
           onGenreChange={this.onGenreChange}
           setGenres={this.setGenres}
           onSearchButtonClick={this.onSearchButtonClick}
           {...this.state} />
         <Movies movies={this.state.movies}
           page={this.state.page}
        onPageIncrease={this.onPageIncrease}
        onPageDecrease={this.onPageDecrease}
           />
    </div>
  );
}
}
export default Main;
