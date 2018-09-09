import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AuthForm from 'components/AuthForm'

const dummy = name => () => <div>{name}</div>

export default (
  <Switch>
    <Route exact path='/signup'
      render={(props) => <AuthForm {...props} authType='signup' />} />
    <Route exact path='/signin'
      render={(props) => <AuthForm {...props} authType='signin' />} />
    <Route exact path='/' component={dummy('home')} />
  </Switch>
)
