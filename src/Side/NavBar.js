/* eslint-disable */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
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
        { (searchValue, setSearchValue) => {
          return searchValue ?
          (
            <form onSubmit={() => setSearchValue(value)}>
              <input type="text" onChange={this.onChange} />
              <input type="submit" />
              {/* <Autosuggest
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
              /> */}
            </form>
          ) : <div>error</div>
        }}
      </AppContext.Consumer>
    );
  }
}

// NavBar.contextType = AppContext;

export default withRouter(NavBar);
