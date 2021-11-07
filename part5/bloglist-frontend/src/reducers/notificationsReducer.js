const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      console.log(action.message);
      return action.message;
    case "DEL_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

let notiTimer = null;
export const addNotification = (message) => {
  if (notiTimer !== null) clearTimeout(notiTimer);
  return (dispatch, getState) => {
    console.log(getState());
    dispatch({
      type: "SET_NOTIFICATION",
      message,
    });
    setTimeout(() => {
      dispatch({
        type: "DEL_NOTIFICATION",
      });
      notiTimer = null;
    }, 4000);
  };
};

export default notificationReducer;
