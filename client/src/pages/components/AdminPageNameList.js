import React from 'react'

import AdminPageName from './AdminPageName'

const AdminPageNameList = ({ items }) => (
  items.length ?
    <section>
      {items.map(item => (
        <AdminPageName key={item._id} {...item} />
      ))}
    </section>
  :
    null
)

export default AdminPageNameList
