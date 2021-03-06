import React from 'react';
import { Route, Link } from 'react-router-dom';
import { NavBar } from './NavBar';

export default function Home() {
  return (
    <>
      <div className="row h-75">
        <div className="col-lg-6 offset-md-3 my-auto">
          <img src={`${process.env.PUBLIC_URL}/wg_small.png`} alt="" style={{ maxWidth: '20%' }} />
          <img src={`${process.env.PUBLIC_URL}/wg_text.png`} alt="Wikigraph" style={{ maxWidth: '80%' }} />
          <Route component={NavBar} />
          <a href="/see/London">try a demo query</a>
        </div>
      </div>
      <div className="row fixed-bottom">
        <div className="col-lg-6 offset-md-3 text-center">
          <p>
            from the&nbsp;
            <a style={{ color: '#47EED0' }} href="https://kcollective.substack.com/" target="_blank" rel="noreferrer">koodos collective</a>
          </p>
        </div>
        <Link to="/about"><p style={{ bottom: 0, right: '15px', position: 'fixed' }}>Info. 🤔📖</p></Link>
      </div>
    </>
  );
}
