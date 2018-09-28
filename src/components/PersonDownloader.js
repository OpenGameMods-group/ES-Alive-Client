import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { pilotActions } from 'store/actions'

const propTypes = {
  children: PropTypes.node,
  downloadPilots: PropTypes.func
}

const defaultProps = {
  children: null
}

class PersonDownloader extends React.Component {
  state = {
    levelLimit: 10
  }

  componentDidMount () {
    const levelLimit = window.localStorage.getItem('levelLimit')
    if (levelLimit) {
      this.setState({
        levelLimit
      })
    }
  }

  handleChange = (evt) => {
    this.setState({
      levelLimit: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const { levelLimit } = this.state
    const { user } = this.props

    this.props.downloadPilots({user, levelLimit})

    window.localStorage.setItem('levelLimit', levelLimit)
  }

  render () {
    const { children, ...props } = this.props

    return (
      <div>
        <form className='columns'>
          <div className='column col-8'>

            <div className='form-group'>
              <label className='form-label'>
              Fleet Level Limit
                <input
                  onChange={this.handleChange}
                  value={this.state.levelLimit}
                  name='levelLimit'
                  type='number'
                  placeholder='levelLimit'
                  className='form-input'
                  required
                />
              </label>
            </div>

            <div>
              <button className='btn' onClick={this.handleSubmit}>
                Download Pilots
              </button>
            </div>

          </div>
        </form>
      </div>
    )
  }
}

PersonDownloader.propTypes = propTypes
PersonDownloader.defaultProps = defaultProps

const mapStateToProps = ({ user }, ownProps) => ({
  user
})

export default connect(mapStateToProps, { ...pilotActions })(PersonDownloader)
