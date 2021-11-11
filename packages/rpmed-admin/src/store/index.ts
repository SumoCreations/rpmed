import { combineReducers, createStore } from 'redux'
import { ISessionState, reducer as sessionReducer } from '../session'

const rootReducer = combineReducers({
  session: sessionReducer,
})

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export interface IStoreState {
  form: object
  session: ISessionState
}

export default store
