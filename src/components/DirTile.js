import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const propTypes = {
  children: PropTypes.node,
  config: PropTypes.object
}

const defaultProps = {
  children: null,
  config: null
}

export const DirTile = ({ children, ...props }) => {
  const { config, ...attributes } = props

  console.log(config)

  return (
    <div>
      <div className='tile'>
        <div className='tile-content'>
          <h5 className='tile-title'>Directory</h5>
          <p className='tile-subtitle'>
        Detected directory:{' '}
            <span className='text-gray'>
              { config ? config.currentDir : 'unknown'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

DirTile.propTypes = propTypes
DirTile.defaultProps = defaultProps

const mapStateToProps = ({ config }, ownProps) => ({
  config
})

export default connect(mapStateToProps)(DirTile)
