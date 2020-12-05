import React from 'react';
import { hotjar } from 'react-hotjar';

export function Fallback() {
  hotjar.initialize(2140781, 6);

  return (
    <div className="row h-75">
      <div className="col-lg-6 offset-md-3 my-auto text-center">
        <h1>😵</h1>
        <h1>Oops, something went wrong.</h1>
        <h3>We might have been confused by your search</h3>
        <h3>
          Try going&nbsp;
          <a href="http://giantgra.ph/">home</a>
          &nbsp;and re-searching.
        </h3>
      </div>
    </div>
  );
}

export default Fallback;
