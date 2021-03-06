// @flow

import { connect } from 'react-redux';
import { searchPages } from '../actions/page';
import SearchBar from '../components/SearchBar';

const mapStateToProps = state => ({
  id: 'search-pages',
  placeholder: 'Search Pages',
  query: state.pageList.query,
});

const mapDispatchToProps = dispatch => ({
  search: (query: string) => dispatch(searchPages(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
