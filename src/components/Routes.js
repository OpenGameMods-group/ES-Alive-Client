import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { SIGNUP, SIGNIN } from 'events/channels'
import AuthForm from 'components/AuthForm'

const dummy = name => () => <div>{name}</div>

export default (
  <Switch>
    <Route exact path='/signup'
      render={(props) => <AuthForm {...props} authType={SIGNUP} />} />
    <Route exact path='/signin'
      render={(props) => <AuthForm {...props} authType={SIGNIN} />} />
    <Route exact path='/' component={dummy('home')} />
  </Switch>
)
