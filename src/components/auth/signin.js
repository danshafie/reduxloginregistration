import React, { Component } from 'react';
import  { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {

  handleFormSubmit({email, password}) {
    console.log('email: ', email );
    console.log('password: ', password );
    this.props.signinUser({email,password})
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }


  render() {
    //handleSubmit is a helper that comes from redux form
    //email and password come from the export redux form we created at the bottom
    //that gets wired up as this.props.fields.email/password
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
      //pass the inputs the helpers we pulled off
      //pass handleSubmit to form submit and pass that the callback to handle submit
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className='form-group'>
          <label>Email:</label>
          <input {...email} className='form-control'/>
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <input {...password} type='password' className='form-control'/>
        </fieldset>
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign In!</button>
      </form>
    )
  }
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}


//in reduxForm first argument is object with form name and fields
//second argument is mapStateToProps
//third argument is action creators to props
export default reduxForm({
  //form is used for application state
  form: 'signin',
  //make sure fields are consistent across code base
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin)
