import React, { Component } from 'react'
import { connect } from 'react-redux'

const productContainer = (ComposedComponent) => {
  class Container extends Component {
    state = {
      zDepth: 1
    }
    handleMouseEnter = () => this.setState({ zDepth: 4 })
    handleMouseLeave = () => this.setState({ zDepth: 1 })
    render() {
      const { zDepth } = this.state
      const {
        dispatch,
        isFetching,
        item
      } = this.props
      const events = {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
      }
      const props = {
        dispatch,
        item,
        zDepth,
        events
      }
      return (
        !isFetching && item && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ products: { items, isFetching } }, { componentId }) => ({
    item: items.find(item => item._id === componentId),
    isFetching,
  })
  return connect(mapStateToProps)(Container)
}

export default productContainer