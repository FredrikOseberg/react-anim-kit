import React from 'react';
import FadeIn from '../FadeIn/FadeIn.jsx';

import PropTypes from 'prop-types';

class FadeInOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    if (this.props.activate) {
      this.setState({ show: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { easeTiming = 0.5 } = this.props;
    const miliseconds = this.secondsToMiliseconds(easeTiming);

    if (prevProps.activate !== this.props.activate) {
      if (this.props.activate) {
        this.setState({ show: true });
      } else {
        setTimeout(() => {
          this.setState({ show: false });
        }, miliseconds);
      }
    }
  }

  secondsToMiliseconds = seconds => {
    return seconds * 1000;
  };

  render() {
    const { activate, component, easeTiming, left, right, up, down, by, delayBy } = this.props;

    const passDownProps = {
      easeTiming,
      left,
      right,
      up,
      down,
      by,
      delayBy
    };

    let fadedComp = (
      <FadeIn {...passDownProps} reset={activate}>
        {component}
      </FadeIn>
    );

    return this.state.show && fadedComp;
  }
}

FadeInOut.propTypes = {
  easeTiming: PropTypes.number,
  left: PropTypes.bool,
  right: PropTypes.bool,
  up: PropTypes.bool,
  down: PropTypes.bool,
  by: PropTypes.number,
  delayBy: PropTypes.number,
  activate: PropTypes.bool
};

FadeInOut.defaultProps = {
  easeTiming: 0.5,
  left: false,
  right: false,
  up: false,
  down: false,
  by: undefined,
  delayBy: undefined,
  activate: false
};

export default FadeInOut;
