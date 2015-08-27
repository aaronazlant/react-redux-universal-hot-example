import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as TodoActions from '../actions/todoActions';
import { VisibilityFilters } from  '../actions/actionTypes';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

function selectTodos(todos, filter) {
  switch (filter) {
  case VisibilityFilters.SHOW_ALL:
    return todos;
  case VisibilityFilters.SHOW_COMPLETE:
    return todos.filter(todo => todo.complete);
  case VisibilityFilters.SHOW_INCOMPLETE:
    return todos.filter(todo => !todo.complete);
  }
}

function select(state) {
  // state = { todos: { visibilityFilter: 'SHOW_ALL', visibleTodos: [] } }
  const {visibilityFilter, todos} = state.todos;

  return {
    visibleTodos: selectTodos(todos, visibilityFilter),
    visibilityFilter: visibilityFilter
  };
}

class Home extends Component {

  static propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
      })),
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
      ]).isRequired
  }

  render() {
    const { dispatch, visibleTodos, visibilityFilter} = this.props;
    const incompleteCount = visibleTodos.filter(todo => !todo.complete).length;
    const completeCount = visibleTodos.filter(todo => todo.complete).length

    let boundActions = bindActionCreators(TodoActions, dispatch);
    const {
      deleteTodo,
      deleteCompletedTodos,
      createTodo,
      editTodo,
      toggleTodo,
      toggleAllTodos,
      setVisibilityFilter
    } = boundActions;

    return (
      <div className="todoapp">
        <Header
          placeholder='What is to be done?'
          createTodo={createTodo}
        />
        <TodoList
          todos={visibleTodos}
          toggleTodo={toggleTodo}
          toggleAllTodos={toggleAllTodos}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
        <Footer
          incompleteCount={incompleteCount}
          completeCount={completeCount}
          deleteCompletedTodos={deleteCompletedTodos}
          filter={visibilityFilter}
          onShow={setVisibilityFilter}
        />
      </div>
    );
  }
}

export default connect(select)(Home);
