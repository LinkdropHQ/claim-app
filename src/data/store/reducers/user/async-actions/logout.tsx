import { Dispatch } from 'redux'
import {
  UserActions
} from '../types'
import { IAppDispatch, RootState } from 'data/store'

function logout () {
  // @ts-ignore
  return async (
    dispatch: Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    if (localStorage) {
      localStorage.clear()
    }
    window.location.reload()
  }
}

export default logout