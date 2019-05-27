import * as Constants from './../constants';

const initialState = {
  current: process.env.DEFAULT_THEME,
};

export default (state=initialState, action={}) => {
  switch (action.type) {

    case Constants.UPDATE_THEME: {
      return {
        ...state,
        current: action.payload.theme,
      }
    }

  }

  return state
}
