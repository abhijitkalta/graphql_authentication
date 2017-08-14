import React, { Component } from 'react';
import AuthForm from './authForm';
import mutation from '../mutations/login';
import currentUserQuery from '../queries/currentUser';
import {graphql} from 'react-apollo';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      errors: []
    }
  };

  componentWillUpdate(nextProps){
    // this.props - current set of props, nextProps - next state of props when component rerenders
    if(!this.props.data.user && nextProps.data.user){
      hashHistory.push('/dashboard');
    }
  };

  handleSubmit({ email, password}){
    this.props.mutate({
      variables: {
        email,
        password
      },
      refetchQueries: [{
        query: currentUserQuery
      }]
    })
    .catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({
        errors: errors
      })
    })
  };
  render(){
    return (
      <div>
        <h3>Login</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.handleSubmit.bind(this)}/>
      </div>
    );
  }
};

export default graphql(currentUserQuery)(
  graphql(mutation)(LoginForm));