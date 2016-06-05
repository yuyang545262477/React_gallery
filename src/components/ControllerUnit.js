// import React from "react";
import React from "react";

class ControllerUnit extends React.Component {
    handleClick(e) {
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
        
        e.preventDefault();
        e.stopPropagation();
    }
    
    
    render() {
        //类名变量化
        var controllerUnitClassName = "controller-unit";
        //如果居中,增加居中变量
        if (this.props.arrange.isCenter) {
            controllerUnitClassName += " is-center";
            //    并且,如果对应反转,增加反转类名
            if (this.props.arrange.isInverse) {
                controllerUnitClassName += " is-inverse";
            }
        }
        return (
            <span className={controllerUnitClassName} onClick={this.handleClick.bind(this)}></span>
        );
    }
}
ControllerUnit.defaultProps = {};


export default ControllerUnit;