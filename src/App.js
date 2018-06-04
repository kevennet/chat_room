import React, { PureComponent, Fragment } from 'react';
import Header from "./components/header";
import Container from "./components/main";
import InputArea from "./components/inputArea";
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <Fragment>
        {/* 导航相关 */}
        <Header />
        {/* 信息展示 */}
        <Container />
        {/* 消息输入 */}
        <InputArea />
      </Fragment>
    );
  }
}

export default App;
