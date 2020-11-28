import React from 'react';
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
