import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node
}

const defaultProps = {
  children: null
}

export const ControlPage = ({ children, ...props }) => {
  const { ...attributes } = props

  return (
    <div>
      ControlPage
    </div>
  )
}

ControlPage.propTypes = propTypes
ControlPage.defaultProps = defaultProps

export default ControlPage
