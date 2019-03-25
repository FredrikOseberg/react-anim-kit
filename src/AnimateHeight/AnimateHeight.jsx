import React from 'react';

class AnimateHeight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialHeight: 0,
      selectedHeight: 0,
      displayDiv: false
    };

    this.contentRef = React.createRef();
    this.outerContentRef = React.createRef();
  }

  componentDidMount() {
    this.setInitialHeight();

    window.addEventListener('transitionend', this.transitionEndCallback);
    window.addEventListener('load', this.adjustContent);
  }

  componentWillUnmount() {
    window.removeEventListener('transitionend', this.transitionEndCallback);
    window.removeEventListener('load', this.adjustContent);
  }

  adjustContent = () => {
    const { shouldChange } = this.props;
    if (shouldChange) {
      this.setState({
        selectedHeight: this.contentRef.current.clientHeight
      });
    } else {
      this.setState({
        initialHeight: this.contentRef.current.clientHeight
      });
    }
  };

  transitionEndCallback = () => {
    const { handleTransitionEnd } = this.props;

    if (handleTransitionEnd) {
      handleTransitionEnd();
    }
  };

  setupEventListeners = handleTransitionEnd => {
    window.addEventListener('transitionend', handleTransitionEnd);
  };

  setInitialHeight = () => {
    setTimeout(() => {
      this.setState({
        initialHeight: this.outerContentRef.current.clientHeight
      });
    }, 100);
  };

  setSelectedHeight = () => {
    this.setState(
      {
        selectedHeight: this.contentRef.current.clientHeight,
        displayDiv: true
      },
      this.handleCallback
    );
  };

  setBaseline = () => {
    const { callback, renderSpaceAfter } = this.props;
    if (callback) {
      callback(0, this.props.animateHeightId);
    }

    if (renderSpaceAfter) {
      setTimeout(() => {
        this.setState({ displayDiv: false });
      }, 500);
    }
  };

  handleCallback = () => {
    const { callback } = this.props;
    if (callback) {
      const transition = this.state.selectedHeight - this.state.initialHeight;
      callback(transition, this.props.animateHeightId);
    }
  };

  getScale = () => {
    const { shouldChange } = this.props;

    if (!shouldChange) {
      return 1;
    }
    return this.state.selectedHeight / this.state.initialHeight;
  };

  getTransition = () => {
    const { transition } = this.props;
    if (transition) {
      return transition;
    }
    return `transform 0.5s ease-in-out`;
  };

  getStyle = () => {
    const { style } = this.props;

    const scaleY = this.getScale();
    const transition = this.getTransition();

    const styles = {
      position: 'absolute',
      top: '0',
      right: '0',
      left: '0',
      bottom: '0',
      backgroundColor: '#fff',
      transition: transition,
      transform: `scaleY(${scaleY})`,
      transformOrigin: 'center top',
      zIndex: '-1000',
      ...style
    };

    return styles;
  };

  getHeight = () => {
    if (this.state.initialHeight) {
      return `${this.state.initialHeight}px`;
    }
    return '100%';
  };

  componentDidUpdate(prevProps) {
    const { shouldChange } = this.props;
    if (shouldChange !== prevProps.shouldChange) {
      if (shouldChange) {
        this.setSelectedHeight();
      } else {
        this.setBaseline();
      }
    }
  }

  renderSpaceAfter = () => {
    if (this.state.displayDiv) {
      return (
        <div
          style={{
            height: `${this.state.selectedHeight - this.state.initialHeight}px`
          }}
        />
      );
    }
  };

  render() {
    const { renderSpaceAfter } = this.props;

    const style = this.getStyle();
    const height = this.getHeight();

    return (
      <React.Fragment>
        <div
          style={{
            position: 'relative',
            height: height,
            width: '100%'
          }}
          ref={this.outerContentRef}
        >
          <div style={style} className={this.props.className} />
          <div ref={this.contentRef}>{this.props.children}</div>
        </div>
        {renderSpaceAfter && this.renderSpaceAfter()}
      </React.Fragment>
    );
  }
}

export default AnimateHeight;
