
import { Dispatch } from 'redux';
import { DropActions } from '../types'
import * as actionsDrop from '../actions'
import * as asyncActionsDrop from '.'
import axios, { AxiosError } from 'axios'
import { IAppDispatch } from 'data/store'

export default function getLinkFromInput(
  linkCode: string,
  callback: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions> & IAppDispatch
  ) => {
    dispatch(actionsDrop.setError(null))
    try {
      const link = await dispatch(asyncActionsDrop.getLinkByCode(
        linkCode,
        callback
      ))
      console.log({ link })
   } catch (err: any | AxiosError) {
      dispatch(actionsDrop.setLoading(false))
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          return { message: 'Code not found' }
        } else {
          return { message: 'Some error occured' }
        }
      } else {
        return { message: 'Some error occured' }
      }
      
    }
  } 
}