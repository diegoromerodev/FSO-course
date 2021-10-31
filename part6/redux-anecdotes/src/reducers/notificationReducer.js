
const notificationReducer = (state = null, action) => {
    switch(action.type){
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
        type: "REMOVE_NOTIFICATION"
    };
};

export const setNotification = (notification, seconds) => {
    return (dispatch) => {
        dispatch({
            type: "SET_NOTIFICATION",
            data: notification
        });
        setTimeout(() =>  dispatch(removeNotification()), seconds * 1000);
    };
};

export default notificationReducer;