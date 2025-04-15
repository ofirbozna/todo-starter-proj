const Router = ReactRouterDOM.HashRouter
const { Provider } = ReactRedux

import { store } from './store/store.js'
import { App } from './pages/App.jsx'

export function RootCmp() {


    return (
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    )
}