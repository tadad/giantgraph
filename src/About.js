import React from 'react'; // you never use this
import { Link } from 'react-router-dom';

export function About() { // am I missing why you export this twice?
  return (
    <>
      <Link to="/"><h1>wikigraph</h1></Link>
      <p>content!!!!lorem</p>
    </>
  );
}

export default About;
