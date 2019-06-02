import * as Constants from './../constants';

export const updateTheme = (theme) => {
  return (dispatch) => {
    dispatch({
      type: Constants.UPDATE_THEME,
      payload: {
        theme,
      },
    })
  }
};

export const updateThemeType = (type) => {
  return (dispatch) => {
    dispatch({
      type: Constants.UPDATE_THEME_TYPE,
      payload: {
        type,
      },
    })
  }
}
