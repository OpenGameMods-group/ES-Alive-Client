import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AuthForm from 'components/AuthForm'
import UserInfo from 'components/UserInfo'
import ControlPage from 'components/ControlPage'
import PersonDownloader from 'components/PersonDownloader'

import { SIGNUP, SIGNIN } from 'store/actions/types'

const dummy = name => () => <div>{name}</div>

export default (
  <Switch>
    <Route exact path='/userinfo' component={UserInfo} />
    <Route exact path='/control' component={ControlPage} />
    <Route exact path='/person-downloader' component={PersonDownloader} />

    <Route exact path='/signup'
      render={(props) => <AuthForm {...props} authType={SIGNUP} />} />
    <Route exact path='/signin'
      render={(props) => <AuthForm {...props} authType={SIGNIN} />} />

    <Route exact path='/' component={dummy('main page')} />
  </Switch>
)
