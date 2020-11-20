import React from 'react';
import './NavBar.css';

export class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            suggestions: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value})
        this.setState({suggestions: []});
        if (this.state.value === "") {
            return;
        }
        // // Figure out a way to do autocomplete
        // const url = 'http://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&callback=addSuggest';
        // fetch(`${url}&search=${this.state.value}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         this.setState({suggestions: data});
        //     });
    }

    render() {
        const suggestion = this.state.suggestions.map((s, index) => <li key={index}>{s}</li>);

        return (
        <nav id='navbar' className='navbar'>
            <div style={{display: 'inline-block', width:'100%'}}>
                <form method="GET" id="query-form" autoComplete='off'>
                    <div className='form-group mb-0'>
                        <label htmlFor='q' className='small text-muted mb-0'>Search</label>
                        <input list='suggest' className="form-control" id='q' name='q' value={this.state.value} onChange={this.handleChange}/>
                        <ul id='suggest'>{suggestion}</ul>
                    </div> 
                </form>
            </div>
        </nav>
        );
    }
}

export default NavBar;