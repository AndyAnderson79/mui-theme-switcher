import * as Constants from './../constants';

export const updateTheme = (theme) => {
  return (dispatch) => {
    dispatch({
      type: Constants.UPDATE_THEME,
      payload: {
        theme,
      }
    })
  }
}
