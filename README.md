# react-anim-kit

React animation kit is a small library focused on making animation with React seamless, while improving the readability of the code.

## Installation

```
npm install --save react-anim-kit
```

## Use

Import the whole library like this:
`import reactAnimationKit from 'react-anim-kit'`

Or use individual components:

```
import { AnimateOnMount, FadeIn, AnimateHeightBySacrificingPerf } from 'react-anim-kit'
```

## Components

### FadeIn

#### Import

```
import { FadeIn } from 'react-anim-kit'
```

#### Description

The FadeIn component uses opacity to fade in any of it's children. It is composable, so you can have nested FadeIn components within FadeIn components, making it very easy
to create animations that build on each other.

The component takes the following Props:

```
up: boolean,
down: boolean,
left: boolean,
right: boolean,
easeTiming: number (SECONDS),
delayBy: number (SECONDS)
```

Examples:

```
<FadeIn right by={300}>This will be faded in right by 300px</FadeIn>

<FadeIn up by={500} delayBy={2}>This will be faded in upwards by 500px after 2 seconds</FadeIn>

<FadeIn left by={150} easeTiming={1s}>This will change the default ease timing from 0.5s to 1s and fade in left by 150px</FadeIn>

<FadeIn down by={200}>
    This will fade down by 200px instantly.
    <FadeIn left by={200} delayBy={1}>
        This will fade in left after 1s.
    </FadeIn>
</FadeIn>
```

### AnimateHeightBySacrificingPerf

#### Import

```
import { AnimateHeightBySacrificingPerf } from 'react-anim-kit'
```

#### Description

AnimateHeight component will wrap any content and automatically adjust the height of it's containing div. It takes a
bool to know whether or not it should change.

```
const { open } = this.state

<div className="container">
    <AnimateHeightBySacrificingPerf shouldChange={open}>
        {open && <SomeContent />}
        {!open && <OtherContent />}
    </AnimateHeightBySacrificingPerf>
</div>
```

It takes the following props:

```
shouldChange: boolean
transition: string (override default transition)
adjustOnTransitionEnd: boolean (determines whether to adjust height on transition end. Useful if you have other transformations on the content box)
```

NOTE: The component only takes into account the height of the inner container, so you might have to offset the main container with extra margin and padding.

#### Example

[![Edit 92n8vlk9ow](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/92n8vlk9ow)

### AnimateOnMount

#### Import

```
import { AnimateOnMount } from 'react-anim-kit'
```

#### Description

The AnimateOnMount component is used to animate components that enter and leave the DOM. Since React utilises a viritual DOM we often use expressions to handle
conditional rendering. IE:

```
    render() {
        <div>
            {show && <SomeComponent />}
        </div>
    }
```

This presents a problem when we want to have components that animate when they enter and leave the DOM. AnimateOnMount solves this problem.

The component takes the following props:

```
mounted: boolean (determines whether or not the component is mounted, must start as false and flip to true),
start: string (class to apply as default)
enter: string (class to apply on enter),
leave: string (class to apply on leave),
```

Examples:

JS:

```
class SomeClass extends Component {
    constructor(props) {
        super(props);

        this.state {
            show: false;
        }
    }

    handleButtonClick = () => this.setState(prevState => ({ show: !prevState.show }))

    render() {
        <div className="container">
            // AnimateOnMount must be in the DOM. Internally it will use the mounted prop to determine whether or not to mount or unmount the components it wraps.
            <AnimateOnMount mounted={this.state.show} start={'sidebar'} enter={'sidebar-show'} leave={'sidebar-leave'}>
                <Sidebar />
            </AnimateOnMount>
            <button onClick={this.handleButtonClick}>Begin Animating</button>
        </div>
    }
}
```

CSS:

```
.sidebar {
    transform: translateX(-400px);
}

.sidebar-enter {
    transform: translateX(0);
    transition: transform 1s ease;
}

.sidebar-leave {
    transform: translateX(-400px);
    transition: transform 1s ease;
}
```
