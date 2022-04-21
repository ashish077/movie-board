import React,{Component} from 'react';
import "./movie.css";
import MovieListItem from './movie-item.js';
import Button from '../nav/searchButton.js';


const Movies = ({
  movies,
  page,
  onPageIncrease,
  onPageDecrease
}) => (
  <section>
    <ul className="movies">
      {movies.map( movie => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </ul>
    <div className="pagination">
      <Button onClick={onPageDecrease}>Previous</Button>
      <span>{`Page ${page}`}</span>
      <Button onClick={onPageIncrease}>Next</Button>
    </div>
  </section>
)


export default Movies;
