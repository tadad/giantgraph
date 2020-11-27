import React from 'react';
import Autosuggest from 'react-autosuggest';
import './NavBar.css';

const countries = require('./countries.json');

const getSuggestions = (value) => { // GET RID OF THIS ONCE WE HAVE WIKI AUTOSUGGEST
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? []
    : countries.filter((nation) => nation.name.toLowerCase().slice(0, inputLength) === inputValue);
};

export class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue,
    });
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value),
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  render() {
    const { value, suggestions } = this.state;

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={(s) => s.name}
        renderSuggestion={(s) => <div>{s.name}</div>}
        inputProps={{
          placeholder: 'Search',
          value,
          onChange: this.onChange,
        }}
      />
    );
  }
}

export default NavBar;
