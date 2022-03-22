import React, {ButtonHTMLAttributes} from 'react';

/*
HTMLButtonElement: button原生dom
ButtonHTMLAttributes: button的属性
*/
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

// ButtonProps组件的属性
const Button:React.FC<ButtonProps> = (props) => {
    const {children} = props;
    return <button type="button">{children}</button>
}

export default Button;
//如果你导出的是type，会保证在编译去掉，可以进行更好的优化
export type {ButtonProps};