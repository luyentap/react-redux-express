import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import AddressFields from './AddressFields'
import SuccessableButton from '../../components/buttons/SuccessableButton'

class AddressItem extends Component {
  state = {
    elevation: 1,
  }
  handleMouseEnter = () => this.setState({ elevation: 4 })
  handleMouseLeave = () => this.setState({ elevation: 1 })
  handleFormSubmit = (values) => {
    const { item: { _id }, onAddressUpdate } = this.props
    return onAddressUpdate(_id, values)
  }
  handleDelete = () => {
    const { item: { _id }, onAddressDelete } = this.props
    return onAddressDelete(_id)
  }
  render() {
    const {
      destroy,
      error,
      handleSubmit,
      submitFailed,
      submitSucceeded,
      submitting,
      valid,
    } = this.props
    return (
      <Card
        zDepth={this.state.elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="card"
        style={{ margin: 16 }}
      >
        <form
          onSubmit={handleSubmit(this.handleFormSubmit)}
          style={{ flex: '1 1 auto' }}
        >
          <AddressFields />
          <div className="button-container">
            <SuccessableButton
              error={error}
              label="Update Address"
              destroy={destroy}
              submitFailed={submitFailed}
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              successLabel="Address Updated!"
              valid={valid}
            />
            <RaisedButton
              type="button"
              label="X"
              className="button delete-button"
              onTouchTap={this.handleDelete}
            />
          </div>
        </form>
      </Card>
    )
  }
}

AddressItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  onAddressUpdate: PropTypes.func.isRequired,
  onAddressDelete: PropTypes.func.isRequired,
}

AddressItem = compose(
  connect((state, { item }) => ({
    form: `address_${item._id}`
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  })
)(AddressItem)

export default AddressItem