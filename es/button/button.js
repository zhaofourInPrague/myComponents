import React from 'react';
// ButtonProps组件的属性
const Button = (props) => {
    const { children } = props;
    return React.createElement("button", { type: "button" }, children);
};
export default Button;
