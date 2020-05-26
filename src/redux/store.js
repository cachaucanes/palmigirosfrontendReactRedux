import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducer/rootReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const miff = (state) => (dispatch) => (next) => {
console.log("store reducer", state.getState());
next(dispatch)

}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(miff, logger, thunk)))

export default store