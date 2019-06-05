import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FadeIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applyStyles: false
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ applyStyles: true }), 50);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reset !== this.props.reset) {
      this.setState({ applyStyles: false });
    }
  }

  decorateStyles = styles => {
    const {
      left = false,
      right = false,
      up = false,
      down = false,
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

    if (up) {
      decoratedStyles.transform = `translateY(${by}px)`;
    }

    if (down) {
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

    return (
      <div style={combinedStyles} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

FadeIn.propTypes = {
  easeTiming: PropTypes.number,
  left: PropTypes.bool,
  right: PropTypes.bool,
  up: PropTypes.bool,
  down: PropTypes.bool,
  by: PropTypes.number,
  delayBy: PropTypes.number,
  reset: PropTypes.bool,
  className: PropTypes.string
};

FadeIn.defaultProps = {
  easeTiming: 0.5,
  left: false,
  right: false,
  up: false,
  down: false,
  by: undefined,
  delayBy: undefined,
  reset: false,
  className: ''
};

export default FadeIn;
