import React from 'react';
import Autosuggest from 'react-autosuggest';
import './NavBar.css';


const countries = require('./countries.json');

const getSuggestions = value => { // GET RID OF THIS ONCE WE HAVE WIKI AUTOSUGGEST
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : countries.filter(country =>
    country.name.toLowerCase().slice(0, inputLength) === inputValue
  );

  // // SOME CODE FOR AUTOCOMPLETE SUGGESTIONS
  // const url = 'http://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&callback=addSuggest';
  // fetch(`${url}&search=${this.state.value}`)
  //     .then(res => res.json())
  //     .then(data => {
  //         console.log(data);
  //         this.setState({suggestions: data});
  //     });

};


export class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={s => s.name}
        renderSuggestion={s => <div>{s.name}</div>}
        inputProps={{
          placeholder: 'Search',
          value,
          onChange: this.onChange.bind(this),
        }}
      />
    );
  }

  // <nav id='navbar' className='navbar'>
  // <div style={{display: 'inline-block', width:'100%'}}>
  //     <form method="GET" id="query-form" autoComplete='off'>
  //         <div className='form-group mb-0'>
  //             <label htmlFor='q' className='small text-muted mb-0'>Search</label>
  //             <input list='suggest' className="form-control" id='q' name='q' value={this.state.value} onChange={this.handleChange}/>
  //             <ul id='suggest'></ul>
  //         </div> 
  //     </form>
  // </div>
  // </nav>

}


export default NavBar;