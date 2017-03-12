import React, { Component } from 'react'
import AdminProductList from './AdminProductList'
import AdminProductAdd from './AdminProductAdd'
import ProductSearch from './ProductSearch'

class AdminProductsPage extends Component {
  render() {
    return (
      <div className="android-more-section">
        <div className="android-section-title mdl-typography--display-1-color-contrast">Products</div>
        <ProductSearch/>
        <AdminProductAdd />
        <AdminProductList />
      </div>
    )
  }
}

export default AdminProductsPage
