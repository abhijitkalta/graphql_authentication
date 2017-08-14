import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit(e){
    e.preventDefault();
    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password
    })
  };

  render(){
    return (
      <div className="row">
        <form className="col s6 offset-s3" onSubmit={this.handleSubmit}>
          <div className="input-field">
            <input value={this.state.email}
              id="email"
              placeholder="Email"
              onChange={(e) => {this.setState({email: e.target.value})}}/>
          </div>
          <div className="input-field">
            <input value={this.state.password} 
              id="password"
              placeholder="Password"
              type="password"
              onChange={(e) => {this.setState({password: e.target.value})}}/>
          </div>
          <div style={{color: 'red', fontSize: 18, margin: 5}}>
            {this.props.errors.map(err => <div key={err}>{err}</div>)}
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
};

export default AuthForm;