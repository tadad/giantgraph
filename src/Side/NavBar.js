/* eslint-disable */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../AppContext';
import './NavBar.css';

const countries = require('./countries.json');

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

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  render() {
    const { value, suggestions } = this.state;

    return (
      <AppContext.Consumer>
        { (context) => {
          return (
            <form onSubmit={() => context.setSearchValue(value)}>
              <input type="text" onChange={this.onChange} />
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
