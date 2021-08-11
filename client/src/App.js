import React from 'react'

import { StoreProvider } from 'easy-peasy'
// store
import store from './store'
// router
import Router from './Router'

export default function App(){
    return (
        <StoreProvider store={store}>
            <Router />

        </StoreProvider>
    )
}