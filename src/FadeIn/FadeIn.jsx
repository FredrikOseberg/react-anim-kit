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

  decorateStyles = styles => {
    const {
      left = false,
      right = false,
      top = false,
      bottom = false,
      by = undefined,
      delayBy = undefined
    } = this.props;

    const decoratedStyles = { ...styles };

    if (left) {
      decoratedStyles.transform = `translateX(${by}px)`;
    }

    if (right) {
      decoratedStyles.transform = `translateX(-${by}px)`;
    }

    if (top) {
      decoratedStyles.transform = `translateY(${by}px)`;
    }

    if (bottom) {
      decoratedStyles.transform = `translateY(-${by}px)`;
    }

    if (delayBy) {
      decoratedStyles.transitionDelay = `${delayBy}s`;
    }

    return decoratedStyles;
  };

  render() {
    const { applyStyles } = this.state;
    const { easeTiming = 0.5 } = this.props;

    const defaultStyles = this.decorateStyles({
      opacity: '0',
      transition: `opacity ${easeTiming}s ease, transform ${easeTiming}s ease`
    });

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
