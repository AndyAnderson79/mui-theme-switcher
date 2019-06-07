import * as Constants from './../constants';

const initialState = {
  current: process.env.APP_DEFAULT_THEME,
  type: process.env.APP_DEFAULT_THEME_TYPE,
};

export default (state=initialState, action={}) => {
  switch (action.type) {

    case Constants.UPDATE_THEME: {
      return {
        ...state,
        current: action.payload.theme,
      }
    }

    case Constants.UPDATE_THEME_TYPE: {
      return {
        ...state,
        type: action.payload.type,
      }
    }

  }

  return state
}
