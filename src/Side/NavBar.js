/* eslint-disable */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../AppContext';
import './NavBar.css';

// I know this isn't permanent, but even for the time being move to an assets directory in public
const countries = require('./countries.json');

// please stop using all caps it hurts my soul
// also remove stuff you aren't actively using what the fuck
// GET RID OF THIS ONCE WE HAVE WIKI AUTOSUGGEST
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : countries.filter(
    (country) => country.name.toLowerCase().slice(0, inputLength) === inputValue,
  );
};

export class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      suggestions: [],
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  // handleSubmit(value, setSearchValue) {
  //   setSearchValue(value);
  // }

  onChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  // delete until using autosuggest, move to context when using it
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // delete until using autosuggest, move to context when using it
  // also I'm gonna delete the repo if I see another non-arrow function (especially literally 2 lines below an arrow function)
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  render() {
    const { value, suggestions } = this.state; // remove unused shit (do this as you go in the future)

    return (
      <AppContext.Consumer>
        { (context) => {
          return (
            <form onSubmit={() => context.setSearchValue(value)}>
              <input type="text" onChange={this.onChange} /> {/* There's literally a search input type */}
              <input type="submit" />
              {/* STYLE THIS SEARCH BOX/BAR, CHANGE CSS FILE */}
            </form>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default withRouter(NavBar);
