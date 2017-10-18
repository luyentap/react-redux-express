import React from 'react'
import PropTypes from 'prop-types'

import typographyContainer from '../../containers/typography/typographyContainer'

const H2 = ({
  children,
  className,
  color,
  textAlign,
  textShadow,
  typography: {
    values: {
      fontFamily,
      fontWeight,
      h2FontFamily,
      h2FontSize: fontSize,
      h2LetterSpacing: letterSpacing,
      lineHeight
    }
  }
}) => (
  <h2
    style={{
      color,
      fontFamily: h2FontFamily || fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      lineHeight,
      textAlign,
      textShadow,
    }}
    {...className}
  >
    {children}
  </h2>
)

H2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  textAlign: PropTypes.string,
  textShadow: PropTypes.string,
  typography: PropTypes.object
}

export default typographyContainer(H2)
