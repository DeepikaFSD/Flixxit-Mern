import React from 'react';
import CardSlider from './CardSlider';

const Slider = ({ movies }) => {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <div>
      <CardSlider title="Action Movies" data={getMoviesFromRange(0, 10)} />
      <CardSlider title="Epics" data={getMoviesFromRange(10, 20)} />
      <CardSlider title="Trending Now" data={getMoviesFromRange(20, 30)} />
      <CardSlider
        title="Blockbuster Movies"
        data={getMoviesFromRange(30, 40)}
      />
      <CardSlider title="Drama " data={getMoviesFromRange(40, 50)} />
      <CardSlider title="Comedy Movies" data={getMoviesFromRange(50, 60)} />
    </div>
  );
};

export default Slider;
