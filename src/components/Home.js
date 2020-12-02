import React from 'react';
import { Route, Link } from 'react-router-dom';
import { NavBar } from './NavBar';

export default function Home() {
  return (
    <>
      <div className="row h-100">
        <div className="col-lg-6 offset-md-3 my-auto">
          <h1 className="text-center mb-3">Wikigraph</h1>
          <Route component={NavBar} />
          <p className="text-muted"><Link to="/about">about</Link></p>
        </div>
      </div>
      <div className="row fixed-bottom">
        <div className="col-lg-6 offset-md-3 text-center">
          <p>
            a drop from the
            <a href="https://www.koodos.com"> koodos collective</a>
          </p>
        </div>
      </div>
    </>
  );
}
