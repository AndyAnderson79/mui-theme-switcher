import * as constants from './../constants'

const initialState = {
  current: process.env.APP_THEME,
  type: process.env.APP_THEME_TYPE,
};

export default (state=initialState, action={}) => {
  switch (action.type) {

    case constants.UPDATE_THEME: {
      return {
        ...state,
        current: action.payload.theme,
      }
    }

    case constants.UPDATE_THEME_TYPE: {
      return {
        ...state,
        type: action.payload.type,
      }
    }

  }

  return state
}
