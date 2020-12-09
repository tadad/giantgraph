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
      selectedURL: '',
      history: props.history,
      dataIsComing: false,
    };
  }

  setNode = (node) => {
    this.setState({ selectedNode: node });
    this.setState({ selectedURL: '' });
  }

  setSearchValue = (e, searchValue) => {
    const { history } = this.props;

    history.push(`/see/${searchValue}`);

    this.setState({ data: { nodes: [], links: [] }, sideIsOpen: false, selectedNode: null });

    this.setState({ searchValue }, () => {
      e.preventDefault();
    });

    this.setState({ dataIsComing: true });
    this.getData(searchValue);
    window.analytics.track('search', {
      searchValue,
    });
  }

  getData = async (searchValue) => {
    if (searchValue) {
      const search = `/api/see/${searchValue}`;
      axios.get(search)
        .then((res) => {
          this.setState({ data: res.data });
        });
    }
  }

  getSide = async (nodeName) => {
    const search = `/api/meta/${nodeName}`;
    axios.get(search)
      .then((res) => {
        this.setState({ selectedURL: res.data.url });
      });
  }

  openSide = () => {
    this.setState({ sideIsOpen: true });
    this.getSide(this.state.selectedNode.name); //eslint-disable-line
  }

  render() {
    const { children } = this.props;
    const {
      data, searchValue, sideIsOpen, selectedNode, selectedURL, history,
      dataIsComing,
    } = this.state;

    return (
      <AppContext.Provider value={{
        data,
        searchValue,
        sideIsOpen,
        selectedNode,
        selectedURL,
        history,
        dataIsComing,
        getData: this.getData,
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
