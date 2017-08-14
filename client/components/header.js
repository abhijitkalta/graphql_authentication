import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import currentUserQuery from '../queries/currentUser'; 
import mutation from '../mutations/logout';

class Header extends Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  };

  handleLogout(){
    this.props.mutate({
      refetchQueries: [{
        query: currentUserQuery
      }]
    });
  };

  renderButtons(){
    if(this.props.data.loading){
      return <div>Loading..</div>;
    };

    if(this.props.data.user){
      return (
        <li>
          <a onClick={this.handleLogout}>Logout</a>
        </li>
      );
    } else{
      return (
        <div>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </div>
      );
    }
  };

  render(){
    return(
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
};

export default graphql(mutation)(
    graphql(currentUserQuery)(Header)
    );