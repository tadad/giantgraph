import React from 'react';

export function Fallback() {
  return (
    <div className="row h-75">
      <div className="col-lg-6 offset-md-3 my-auto text-center">
        <h1>😰</h1>
        <h1>Sorry, something went wrong</h1>
        <h3>
          Try going&nbsp;
          <a href="http://giantgra.ph/">home</a>
          &nbsp;and trying again
        </h3>
      </div>
    </div>
  );
}

export default Fallback;
