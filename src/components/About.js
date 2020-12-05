/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';


export default function About() {
  return (
    <div className="row h-75">
      <div className="col-lg-6 offset-md-3 my-auto">
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/wg_small.png`} alt="" style={{ maxWidth: '10%' }} />
          <img src={`${process.env.PUBLIC_URL}/wg_text.png`} alt="Wikigraph" style={{ maxWidth: '40%' }} />
        </Link>
        <p>
          Read our paper on <a href="https://koodos.substack.com/">Exploration Engines</a>.
        </p>
        <p>
          Created by <a href="https://twitter.com/drew_tada" target="_blank" rel="noreferrer">Drew Tada</a> & <a href="https://github.com/pamann" target="_blank" rel="noreferrer">Pam Beardsell</a>. 
          Special thanks to <a href="https://twitter.com/Jad_AE" target="_blank" rel="noreferrer">Jad Esber</a>, Brandon Baraban, and everyone at the <a style={{ color: '#47EED0' }} href="https://www.koodos.com" target="_blank" rel="noreferrer">koodos collective</a>.
        </p>
      </div>
    </div>
  );
}
