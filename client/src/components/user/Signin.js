import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm, actions } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import userContainer from '../../containers/user/userContainer'
import SuccessableButton from '../buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import { fetchSignin } from '../../actions/user'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'email', 'password' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}


class Signin extends Component {
  state = {
    open: false,
    message: null
  }
  handleClose = () => {
    this.setState({open: false})
    this.props.dispatch(push('/'))
  }
  handleSignin = values => {
    const { dispatch } = this.props
    return dispatch(fetchSignin(values))
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, submitSucceeded, user } = nextProps
    if (submitSucceeded && user._id) {
      return browserHistory.goBack()
    }
  }
  render() {
    const {
      destroy,
      error,
      handleSubmit,
      primary1Color,
      pristine,
      submitFailed,
      submitSucceeded,
      submitting,
      user,
      valid
    } = this.props
    return (
      <div className="page">
        <section className="section-margin">
          <Card>
            <CardTitle title="Sign in" subtitle="Enter your information" />
            <form onSubmit={handleSubmit(this.handleSignin)}>
              <CardText>
                <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
                <Field name="password" component={renderTextField} label="Password" fullWidth={true} type="password" />
              </CardText>
              <CardActions style={{ display: 'flex' }}>
                <SuccessableButton
                  error={error}
                  label={`Sign In`}
                  destroy={destroy}
                  submitFailed={submitFailed}
                  submitSucceeded={submitSucceeded}
                  submitting={submitting}
                  successLabel={`Welcome ${user.values.firstName}!`}
                  valid={valid}
                />
              </CardActions>
            </form>
            {!this.state.open ? null :
            <Dialog
              actions={
                <FlatButton
                  label="Close"
                  primary={true}
                  onTouchTap={this.handleClose}
                />
              }
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              {this.state.message}
            </Dialog>
            }
            <CardActions style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
              <p>Don't have an account? <Link to="/user/signup" style={{ color: primary1Color }}>Sign up instead!</Link></p>
              <p><Link to="/user/recovery" style={{ color: primary1Color }}>Forgot your password?</Link></p>
            </CardActions>
          </Card>
        </section>
      </div>
    )
  }
}

Signin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  primary1Color: PropTypes.string,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default userContainer(reduxForm({
  form: 'signin',
  validate,
  destroyOnUnmount: true
})(Signin))