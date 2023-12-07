import { configureStore } from '@reduxjs/toolkit'
import settings from '../reducers/settings'

export default configureStore({
  reducer: {
    settings: settings,
  },
})