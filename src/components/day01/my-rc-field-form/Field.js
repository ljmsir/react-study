import React, { Component } from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    const { registEntity } = this.context;
    this.cancelRegist = registEntity(this);
  }

  componentWillUnmount() {
    if (this.cancelRegist) {
      this.cancelRegist();
    }
  }

  getControled = () => {
    const { name } = this.props;
    const { getFieldValue, setFieldsValue } = this.context;
    return {
      value: getFieldValue(name),
      onChange: (event) => {
        const newValue = event.target.value;
        setFieldsValue({ [name]: newValue });
      },
    };
  };

  onStoreChange = () => {
    this.forceUpdate();
  };

  render() {
    const { children } = this.props;
    const cloneChildNode = React.cloneElement(children, this.getControled());
    return cloneChildNode;
  }
}
