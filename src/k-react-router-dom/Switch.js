import React, { Component } from "react";
import matchPath from "./matchPath";
import { RouterContext } from "./Context";

class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { location } = context;
          //!match 是否匹配
          //!element 记录匹配的元素
          let match, element;
          React.Children.forEach(this.props.children, (child) => {
            if (match == null && React.isValidElement(child)) {
              element = child;
              const { path } = child.props;
              match = path
                ? matchPath(location.pathname, child.props)
                : context.match;
            }
          });
          return match
            ? React.cloneElement(element, {
                computedMatch: match,
              })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Switch;
