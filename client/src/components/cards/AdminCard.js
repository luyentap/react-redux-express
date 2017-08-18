import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import cardContainer from '../../containers/cards/cardContainer'
import loadImage from '../images/loadImage'
import AdminCardEdit from './AdminCardEdit'
import { startEdit } from '../../actions/cards'

const AdminCard = ({ cursor, dispatch, item, elevation, events }) => {
  const { _id, editing, image, values } = item
  const { iframe, iframeBorder, margin, text } = values
  return (
    <Card
      {...events}
      onTouchTap={() => dispatch(startEdit(_id))}
      style={{ cursor, margin }}
      zDepth={elevation}
      id={_id}
    >
      {image && image.src && <CardMedia><img src={image.src} alt="card"/></CardMedia>}
      {iframe &&
        <div style={{ position: 'relative', paddingBottom: '50%', border: iframeBorder }}>
          <iframe
            title="iframe"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src={iframe} frameBorder="0" allowFullScreen>
          </iframe>
        </div>
      }
      {text && text.length > 8 && <CardText>{renderHTML(text)}</CardText> }
      {editing && <AdminCardEdit item={item} />}
    </Card>
  )
}

AdminCard.propTypes = {
  item: PropTypes.object.isRequired,
  elevation: PropTypes.number.isRequired,
  events: PropTypes.object,
}

export default cardContainer(loadImage(AdminCard))