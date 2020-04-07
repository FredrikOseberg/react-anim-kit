# react-anim-kit

[![pipeline status](https://gitlab.com/FredrikOseberg/react-anim-kit/badges/master/pipeline.svg)](https://gitlab.com/FredrikOseberg/react-anim-kit/-/commits/master)

View the docs here: https://fredrikoseberg.github.io/react-anim-kit-docs

## Introduction

This library contains animation helpers based mainly on the CSS properties opacity and transform.
Because of how the browser handles rendering, these properties are best suited to handle
ui animations when manipulating css properties - [see the full overview here](https://csstriggers.com/).

## Components

```
<FadeIn left by={300}>
    <div>Some content</div>
</FadeIn>
```

Fades in all of it's children. [See full documentation here](https://fredrikoseberg.github.io/react-anim-kit-docs/#/docs/fadein).

```
<AnimateOnMount start="start-class" enter"enter-class" leave="leave-class" show={show}>
    <div>content</div>
</AnimateOnMount>
```

Applies classes to animate it's children on entering and leaving the DOM. [See full documentation here](https://fredrikoseberg.github.io/react-anim-kit-docs/#/docs/animateonmount).

```
<AnimateHeight>
    <div>Content</div>
</AnimateHeight>
```

Uses transform: scaleY to fake height animation. This component can be tricky to use, but worth it if you want performant animations. [See an article describing usage here](https://www.freecodecamp.org/news/animating-height-the-right-way/)

[See full documentation here](https://fredrikoseberg.github.io/react-anim-kit-docs/#/docs/animateheight).

```
<FadeInOut left by={300} show={show}>
    <div>Some content</div>
</FadeInOut>
```

Fades in all of it's on mounting. Fades out all of it's children on leaving the DOM.

```
<AnimateHeightBySacrificingPerf shouldChange={open}>
    <div>Some content</div>
</AnimateHeightBySacrificingPerf>
```

Adjust the height of the container based on the content. This uses the height css property and is
bad for perforamance - use AnimateHeight instead if you can. [See full documentation here](https://fredrikoseberg.github.io/react-anim-kit-docs/#/docs/animateheightbysacrificingperf).
