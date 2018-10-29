# react-anim-kit

React animation kit is a small library focused on making animation with React seamless, while improving the readability of the code.

## Installation

```
npm install --save react-anim-kit
```

## Components

### FadeIn

The FadeIn component uses opacity to fade in any of it's children. It is composable, so you can have nested FadeIn components within FadeIn components, making it very easy
to create animations that build on each other.

The component takes the following Props:

```
right: boolean,
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

### AnimateOnMount

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
            <AnimateOnMount start={'sidebar'} enter={'sidebar-show'} leave={'sidebar-leave'}>
                <Sidebar />
            </AnimateOnMount>
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
