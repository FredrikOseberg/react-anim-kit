import React, { Component } from 'react';

class FadeIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applyStyles: false
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ applyStyles: true }), 0);
  }

  render() {
    const { left = false, right = false, top = false, bottom = false, by = undefined } = this.props;
    const { applyStyles } = this.state;

    const defaultStyles = {
      opacity: '0',
      transition: 'opacity 0.5s ease, transform 0.5s ease'
    };

    if (left) {
      defaultStyles.transform = `translateX(${by}px)`;
    }

    if (right) {
      defaultStyles.transform = `translateX(-${by}px)`;
    }

    if (top) {
      defaultStyles.tranform = `translateY(${by}px)`;
    }

    if (bottom) {
      defaultStyles.transform = `translateY(-${by}px)`;
    }

    let animationStyles;
    if (applyStyles) {
      animationStyles = {
        opacity: '1',
        transform: 'translateX(0) translateY(0)'
      };
    }

    const combinedStyles = { ...defaultStyles, ...animationStyles };

    return <div style={combinedStyles}>{this.props.children}</div>;
  }
}

export default FadeIn;
