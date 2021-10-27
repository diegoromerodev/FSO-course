import React, { useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const shouldHide = { display: visible ? "none" : "" };
  const shouldShow = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <button style={shouldHide} onClick={toggleVisibility}>
        {props.buttonText}
      </button>

      <div style={shouldShow}>
        <div>{props.children}</div>
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  );
});

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
