import React from 'react';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
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
      value: '',
      suggestions: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  handleSubmit() {
    this.props.history.push('/see/' + this.state.value); //eslint-disable-line
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
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
      <form onSubmit={this.handleSubmit}>
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
      </form>
    );
  }
}

export default withRouter(NavBar);
