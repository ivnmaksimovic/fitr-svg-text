import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FitrSvgText from '../src';

storiesOf('ReactResponsiveText within svg', module)
	.addDecorator(story => (
		<div className="wrapper"
			style={{margin: '10px auto', width: '400px'}}>
			<svg viewBox="0 0 400 200" style={{display: 'block', width: '100%', outline: '4px solid red'}}>

				{story()}

				<rect width="200" height="2" x="100" y="50" fill="red"/>
				<rect width="200" height="2" x="100" y="100" fill="red"/>
				<rect width="200" height="2" x="100" y="150" fill="red"/>
			</svg>
		</div>
	))
	.add('limit width when many characters', () => (
		<FitrSvgText
			text='This should fit here'
			width={200}
			maxHeight={80}
			x={200}
			y={100}
			parentSvgHeight={200}
			textAnchor='middle'
		/>
	))
	.add('limit width when a bit less characters', () => (
		<FitrSvgText
			text='Also fit here'
			width={200}
			maxHeight={80}
			x={200}
			y={100}
			parentSvgHeight={200}
			textAnchor='middle'
		/>
	))
	.add('also limit when too many characters', () => (
		<FitrSvgText
			text='This is just to many characters, but it also fits'
			width={200}
			maxHeight={80}
			x={200}
			y={100}
			parentSvgHeight={200}
			textAnchor='middle'
		/>
	))
	.add('limit height with text-anchor=middle', () => (
		<FitrSvgText
			text='Yo!'
			width={200}
			maxHeight={80}
			x={200}
			y={100}
			parentSvgHeight={200}
			textAnchor='middle'
		/>
	))
	.add('limit height with text-anchor=start', () => (
		<FitrSvgText
			text='Yo!'
			width={200}
			maxHeight={80}
			x={100}
			y={100}
			parentSvgHeight={200}
			textAnchor='start'
		/>
	))
	.add('limit height with text-anchor=end', () => (
		<FitrSvgText
			text='Yo!'
			width={200}
			maxHeight={80}
			x={300}
			y={100}
			parentSvgHeight={200}
			textAnchor='end'
		/>
	))