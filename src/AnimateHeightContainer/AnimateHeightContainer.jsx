import React from 'react';

class AnimateHeightContainer extends React.Component {
  renderItems = () => {
    if (this.props.selectedId !== undefined && this.props.transitionAmount !== undefined) {
      return this.renderSingleOpen();
    } else if (this.props.transitionAmounts) {
      return this.renderMultiple();
    }
  };

  renderMultiple = () => {
    return React.Children.map(this.props.children, child => {
      const transitionAmount = this.calculateMultipleHeight(this.props.transitionAmounts, child);

      const transition = this.getTransition();

      return this.createContainer(transition, transitionAmount, child);
    });
  };

  calculateMultipleHeight = (transitionAmounts, child) => {
    let result = 0;
    transitionAmounts.forEach(item => {
      if (item.id < child.props.animateHeightId) {
        result += item.transitionAmount;
      }
    });
    return result;
  };

  renderSingleOpen = () => {
    return React.Children.map(this.props.children, child => {
      let transitionAmount = 0;
      if (child.props.animateHeightId > this.props.selectedId) {
        transitionAmount = this.props.transitionAmount;
      }

      const transition = this.getTransition();
      return this.createContainer(transition, transitionAmount, child);
    });
  };

  getTransition = () => {
    let transition = 'transform 0.5s ease-in-out';

    if (this.props.transition) {
      transition = this.props.transition;
    }

    return transition;
  };

  createContainer = (transition, transitionAmount, child) => {
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
  };

  render() {
    return <React.Fragment>{this.renderItems()}</React.Fragment>;
  }
}

export default AnimateHeightContainer;
