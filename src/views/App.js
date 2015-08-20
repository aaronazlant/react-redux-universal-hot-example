import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {createTransitionHook} from '../universalRouter';


const title = 'React Redux TodoMVC Example';
const description = 'All the modern best practices in one example.';
const image = 'https://react-redux.herokuapp.com/logo.jpg';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@erikras',
      'twitter:creator': '@erikras',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200'
    }
  }
};

@connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch))
export default class App extends Component {
  static propTypes = {
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <DocumentMeta {...meta}/>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }

  // handleLogout(event) {
  //   event.preventDefault();
  //   this.props.logout();
  // }

  // static fetchData(store) {
  //   const promises = [];
  //   if (!isInfoLoaded(store.getState())) {
  //     promises.push(store.dispatch(loadInfo()));
  //   }
  //   if (!isAuthLoaded(store.getState())) {
  //     promises.push(store.dispatch(loadAuth()));
  //   }
  //   return Promise.all(promises);
  // }
}

