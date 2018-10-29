import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnimateOnMount extends Component {
  constructor(props) {
    super(props);

    const { mounted } = this.props;

    this.state = {
      show: mounted,
      styles: null
    };
  }

  componentDidUpdate(prevProps) {
    const { mounted, enter, leave } = this.props;
    if (prevProps.mounted !== mounted) {
      if (mounted) {
        this.setState({ show: true }, () => {
          setTimeout(() => {
            this.setState({ styles: enter });
          }, 50);
        });
      } else {
        this.setState({ styles: leave });
      }
    }
  }

  onTransitionEnd = () => {
    const { mounted } = this.props;
    if (!mounted) {
      this.setState({ show: false });
    }
  };

  render() {
    const { start } = this.props;
    const { show, styles } = this.state;

    return show ? (
      <div className={`${start} ${styles}`} onTransitionEnd={this.onTransitionEnd}>
        {this.props.children}
      </div>
    ) : null;
  }
}

AnimateOnMount.propTypes = {
  mounted: PropTypes.bool.isRequired,
  enter: PropTypes.string,
  leave: PropTypes.string,
  start: PropTypes.string
};

AnimateOnMount.defaultProps = {
  enter: '',
  leave: '',
  start: ''
};

export default AnimateOnMount;
