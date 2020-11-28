import React from 'react';
import PropTypes from 'prop-types';

const hardData = require('./Renaissance.json'); // needs to be dynamically fetched from server

// eslint complains that it "prefers default." No idea what that means or why i should care
export const AppContext = React.createContext();

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: hardData,
      searchValue: '',
      sideIsOpen: false,
      selectedNode: null,
    };

    this.setSearchValue = this.setSearchValue.bind(this);
  }

  setNode = (node) => {
    this.setState({ selectedNode: node });
  }

  setSearchValue = (newValue) => {
    console.log(newValue);
    this.props.history.push('/see/' + newValue); //eslint-disable-line
  }

  openSide = () => {
    this.setState({ sideIsOpen: true });
  }

  closeSide = () => {
    this.setState({ sideIsOpen: false });
  }

  render() {
    const { children } = this.props;
    const {
      data, searchValue, sideIsOpen, selectedNode,
    } = this.state;
    return (
      <AppContext.Provider value={{
        data,
        sideIsOpen,
        selectedNode,
        searchValue,
        setNode: this.setNode,
        setSearchValue: this.setSearchValue,
        openSide: this.openSide, // ???
        closeSide: this.closeSide,
      }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
