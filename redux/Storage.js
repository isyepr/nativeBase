import { createStore } from 'redux'
import { reducerToken } from './Reducer'
const storeState = createStore(reducerToken);
export default storeState;