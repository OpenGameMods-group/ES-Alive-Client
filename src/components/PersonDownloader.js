import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const propTypes = {
  children: PropTypes.node
}

const defaultProps = {
  children: null
}

export const PersonDownloader = ({ children, ...props }) => {
  const { ...attributes } = props

  return (
    <div>
      PersonDownloader
    </div>
  )
}

PersonDownloader.propTypes = propTypes
PersonDownloader.defaultProps = defaultProps

export default PersonDownloader
