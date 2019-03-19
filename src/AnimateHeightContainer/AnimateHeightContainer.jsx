import React from 'react';

class AnimateHeightContainer extends React.Component {
  renderItems = () => {
    return React.Children.map(this.props.children, child => {
      let transitionAmount = 0;
      if (child.props.id > this.props.selectedId) {
        transitionAmount = this.props.transitionAmount;
      }

      let transition = 'transform 0.5s ease-in-out';

      if (this.props.transition) {
        transition = this.props.transition;
      }

      return (
        <div
          style={{
            transition: transition,
            transform: `translateY(${transitionAmount}px)`
          }}
        >
          {child}
        </div>
      );
    });
  };

  render() {
    return <React.Fragment>{this.renderItems()}</React.Fragment>;
  }
}

export default AnimateHeightContainer;
