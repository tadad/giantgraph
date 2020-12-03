import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { nodes: [], links: [] },
      searchValue: '',
      sideIsOpen: false,
      selectedNode: null,
      selectedSummary: '',
      selectedURL: '',
    };
  }

  setNode = (node) => {
    this.setState({ selectedNode: node });
    this.setState({ selectedSummary: '', selectedURL: '' });
  }

  setSearchValue = (e, searchValue) => {
    this.setState({ data: { nodes: [], links: [] }, sideIsOpen: false, selectedNode: null });
    this.setState({ searchValue }, () => {
      // console.log(`setting search value: ${this.state.searchValue}`); //eslint-disable-line
      const { history } = this.props;
      history.push(`/see/${searchValue}`);
      e.preventDefault();
    });
    this.getData(searchValue);
  }

  getData = async (searchValue) => {
    if (searchValue) {
      const search = `/api/see/${searchValue}`;
      axios.get(search)
        .then((res) => {
          console.log('line 45');
          console.log(res.data);
          this.setState({ data: res.data });
        });
    }
  }

  getSide = async (nodeName) => {
    const search = `/api/meta/${nodeName}`;
    axios.get(search)
      .then((res) => {
        this.setState({ selectedSummary: res.data.summary, selectedURL: res.data.url });
      });
  }

  openSide = () => {
    this.setState({ sideIsOpen: true });
    this.getSide(this.state.selectedNode.name); //eslint-disable-line
  }

  closeSide = () => {
    this.setState({ sideIsOpen: false });
  }

  render() {
    const { children } = this.props;
    const {
      data, searchValue, sideIsOpen, selectedNode, selectedSummary, selectedURL,
    } = this.state;

    return (
      <AppContext.Provider value={{
        data,
        searchValue,
        sideIsOpen,
        selectedNode,
        selectedSummary,
        selectedURL,
        setNode: this.setNode,
        setSearchValue: this.setSearchValue,
        openSide: this.openSide,
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
  // object is not allowed as a proptype for eslint...
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default withRouter(AppProvider);
