import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeNotification} from "../reducers/notificationReducer";

const Notification = () => {
    const dispatch = useDispatch();
    const notification = useSelector(({notification}) => {
        if(notification){
            setTimeout(() => {
                dispatch(removeNotification());
            }, 5000);
        }
        return notification;
    });
    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1
    };
    if(!notification) return <div />;
    return (
        <div style={style}>
            {notification}
        </div>
    );
};

export default Notification;