const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "REMOVE_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

let lastNotificationId = null;
export const setNotification = (notification, seconds) => {
  if (lastNotificationId !== null) clearTimeout(lastNotificationId);
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: notification,
    });
    lastNotificationId = setTimeout(() => {
      dispatch(removeNotification());
      lastNotificationId = null;
    }, seconds * 1000);
  };
};

export default notificationReducer;
