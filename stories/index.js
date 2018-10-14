import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import FitrSvgText from '../src';

const styles = {
	wrapper: {
		margin: '10px auto',
		width: '400px'
	},
	svg: {
		display: 'block',
		width: '100%',
		outline: '4px solid red'
	}
};
const SVGDecorator = (storyFn) => (
	<div className="wrapper" style={styles.wrapper} >
		<svg viewBox="0 0 400 200" style={styles.svg}>

			{ storyFn() }

			<rect width="200" height="2" x="100" y="50" fill="red"/>
			<rect width="200" height="2" x="100" y="100" fill="red"/>
			<rect width="200" height="2" x="100" y="150" fill="red"/>
		</svg>
	</div>
);

const stories = storiesOf('FitrSvgText', module);
	stories
	.addDecorator(SVGDecorator)
	.addDecorator(withInfo)

	.add('limit width when many characters',
		() => (
			<FitrSvgText
				text='This should fit here'
				width={200}
				maxHeight={80}
				x={200}
				y={100}
				parentSvgHeight={200}
				textAnchor='middle'
			/>
		),
		{ info: 'Text should addapt it\'s size to fit in 200 x 80 regardles of number of characters' }
	)
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
	.add('limit height with text-anchor=middle',
		() => (
			<FitrSvgText
				text='Yo!'
				width={200}
				maxHeight={80}
				x={200}
				y={100}
				parentSvgHeight={200}
				textAnchor='middle'
			/>
		),
		{ info: 'Text should never be taller than 80 regardles of number of characters' }
	)
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
	.add('adds class to text tag', () => (
		<FitrSvgText
			textClassName='class-1 class-2'
			text='Yo!'
			width={200}
			maxHeight={80}
			x={300}
			y={100}
			parentSvgHeight={200}
			textAnchor='end'
		/>
	))