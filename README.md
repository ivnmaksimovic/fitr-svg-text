# fitr-svg-text

React text component that fits the text within svg to specified dimensions and position.

## Install

```bash
npm install --save fitr-svg-text
```

## Usage

````js
import React from 'react';
import ReactDOM from 'react-dom';
import FitrSvgText from 'fitr-svg-text';

ReactDOM.render(
  <svg id="some-svg-container" viewBox="0 0 400 200" >
    <FitrSvgText
      text='This should fit in 200px'
      width={200}
      maxHeight={80}
      x={200}
      y={100}
      parentSvgHeight={200}
      textAnchor='middle'
    />
  </svg>,
  document.getElementById('root')
);
`````

## API

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| text | string | - | Text to render |
| width | number | - | Width to fit text to |
| maxHeight | number | - | Limit height so text can not grow to much if there is for example only 2 characters but width is 400px |
| x | number | - | x position of text relative to parent svg. It respects the text-achor property |
| y | number | - | y position of text baseline relative to parent svg |
| parentSvgHeight | number | - | parent svg height is unfortunately required for positioning to work. This is implementation detail that should be maybe solved in better way |
| textAnchor | string | 'start' | native text-anchor accepting one of 'start', 'middle' or 'end' [https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor) |

## Develop

1. run `npm install`
2. run `npm start`
3. go to [http://localhost:9001/](http://localhost:9001/)

## License

`fitr-svg-text` is released under the MIT license.