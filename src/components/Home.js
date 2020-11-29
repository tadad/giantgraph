import React from 'react';
import { Route, Link } from 'react-router-dom';
import { NavBar } from './NavBar';

export default function Home() {
  return (
    <>
      <Link to="/about"><h1>wikigraph</h1></Link>
      <Route component={NavBar} />
    </>
  );
}
