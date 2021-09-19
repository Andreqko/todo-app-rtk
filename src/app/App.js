import React from 'react';

import classes from './app.module.css';
import Header from '../common/components/Header/Header';
import TodoList from '../common/components/TodoList/TodoList';
import Footer from '../common/components/Footer/Footer';

const App = () => (
  <div className={classes.App}>
    <h1 className={classes.AppTitle}>TODO</h1>
    <Header className={classes.Header} />
    <TodoList />
    <Footer />
  </div>
);

export default App;
