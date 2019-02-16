import React from 'react';

class AnimateHeight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialHeight: 'auto',
      selectedHeight: 0
    };

    this.contentRef = React.createRef();
  }

  componentDidMount() {
    const { adjustOnTransitionEnd } = this.props;
    this.setState({ initialHeight: this.contentRef.current.clientHeight });

    if (adjustOnTransitionEnd) {
      window.addEventListener('transitionend', this.handleTransitionEnd);
    }
  }

  componentWillUnmount() {
    const { adjustOnTransitionEnd } = this.props;

    if (adjustOnTransitionEnd) {
      window.removeEventListener('transitionend', this.handleTransitionEnd);
    }
  }

  handleTransitionEnd = () => {
    const { shouldChange } = this.props;
    if (shouldChange) {
      this.setState({ selectedHeight: this.contentRef.current.clientHeight });
    } else {
      this.setState({ initialHeight: this.contentRef.current.clientHeight });
    }
  };

  componentDidUpdate(prevProps) {
    const { shouldChange } = this.props;
    if (shouldChange !== prevProps.shouldChange && shouldChange) {
      this.setState({ selectedHeight: this.contentRef.current.clientHeight });
    }
  }

  render() {
    const { shouldChange, transition } = this.props;

    let val = this.state.initialHeight;
    if (!shouldChange) {
      if (this.state.initialHeight !== 'auto') {
        val = `${this.state.initialHeight}px`;
      }
    } else {
      val = `${this.state.selectedHeight}px`;
    }

    let transitionStyles = transition;
    if (!transitionStyles) {
      transitionStyles = `height 0.5s ease-in-out`;
    }

    return (
      <div style={{ height: val, transition: transitionStyles }}>
        <div ref={this.contentRef}>{this.props.children}</div>
      </div>
    );
  }
}

export default AnimateHeight;
