export const DELETE_MESSAGE = 'DELETE_MESSAGE'
export const clearMessage = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'DELETE_MESSAGE'
    })
  }, 3000)
}