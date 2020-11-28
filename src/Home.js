import React from 'react'; // where is this being used
import { Route, Link } from 'react-router-dom';
import { NavBar } from './Side/NavBar';

export function Home() {
  return (
    <>
      <Link to="/about"><h1>wikigraph</h1></Link>
      <Route component={NavBar} />
    </>
  );
}

export default Home;
