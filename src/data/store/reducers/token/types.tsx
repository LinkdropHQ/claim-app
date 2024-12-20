import { ActionType } from 'typesafe-actions';
import * as actions from './actions'

export interface TokenState {
  loading: boolean
  name: string
  description: string
  image: string | null
  decimals: number
  linkdropToken: boolean
}

export type TokenActions = ActionType<typeof actions>;