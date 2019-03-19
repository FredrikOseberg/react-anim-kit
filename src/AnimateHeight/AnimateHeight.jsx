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
    const { handleTransitionEnd } = this.props;
    this.setInitialHeight();

    if (handleTransitionEnd) {
      this.setupEventListeners();
    }
  }

  setupEventListeners = handleTransitionEnd => {
    window.addEventListener('transitionend', handleTransitionEnd);
  };

  setInitialHeight = () => {
    setTimeout(() => {
      this.setState({
        initialHeight: this.outerContentRef.current.clientHeight
      });
    }, 0);
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
      callback(0, 0);
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
      callback(transition, this.props.id);
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

  componentWillUnmount() {
    const { handleTransitionEnd } = this.props;
    if (handleTransitionEnd) {
      window.removeEventListener('transitionend', handleTransitionEnd);
    }
  }

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
          <div ref={this.contentRef} style={{ display: 'inline-block' }}>
            {this.props.children}
          </div>
        </div>
        {renderSpaceAfter && this.renderSpaceAfter()}
      </React.Fragment>
    );
  }
}

export default AnimateHeight;
