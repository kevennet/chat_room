import * as React from 'react';
import './App.css';

import { hot } from 'react-hot-loader';
import Head from "./compents/head";

import * as Loadable from 'react-loadable';
import Loading from './my-loading-component';

const LoadableComponent = Loadable({
  loader: () => import('./my-component'),
  loading: Loading,
});

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Head />
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <LoadableComponent/>
      </div>
    );
  }
}

export default hot(module)(App);
