import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Scales text to fit it's container by setting it's viewbox to it's dimensions and
 * than do small position adjustments
 */
class FitrSvgText extends Component {
	constructor(props) {
		super(props);

		this.state = {
			x: this.props.x,
			y: this.props.y,
			viewBox: undefined,
			width: this.props.width
		}

		this.fitSvgInHtml = this.fitSvgInHtml.bind(this);
		this.fitSvgInSvg = this.fitSvgInSvg.bind(this);
		this.convertValueToPx.bind(this);
	}

	componentDidMount() {
		this.setState(() => this.getNewDimensions());
	}

	componentDidUpdate(prevProps) {
		if (this.props.text !== prevProps.text) {
			this.setState(() => this.getNewDimensions());
		}
	}

	convertValueToPx(valueInPercents, hundredPercentsInPixels) {
		const valueWithoutUnit = parseInt(valueInPercents, 10);
		const v = valueWithoutUnit / 100 * hundredPercentsInPixels;
		return v;
	}

	getNewDimensions() {
		const textWidth = this.text.getBBox().width; // default text width
		const textHeight = this.text.getBBox().height; // default text height
		this.parentNode = this.positioner.parentNode;

		if (!this.props.inHtml) {
			this.parentSvg = this.parentNode.closest("svg");
			this.parentElementHeight = this.parentSvg.getBoundingClientRect().height; // height of container svg

			return this.fitSvgInSvg(textWidth, textHeight, this.props.width, this.props.maxHeight, this.parentElementHeight);
		}

		const containerStyles = window.getComputedStyle(this.parentNode);
		const containerHeight = parseFloat(containerStyles.height);
		const containerWidth = parseFloat(containerStyles.width);
		const maxHeight = this.convertValueToPx(this.props.maxHeight, containerHeight);

		return this.fitSvgInHtml(textWidth, textHeight, containerWidth, maxHeight, containerHeight);
		// const containerDimensions = this.parentNode.getBoundingClientRect();
		// const maxHeight = this.convertValueToPx(this.props.maxHeight, containerDimensions.height);

		// return this.fitSvgInHtml(textWidth, textHeight, containerDimensions.width, maxHeight);
	}

	fitSvgInHtml(textWidth, textHeight, width, maxHeight, containerHeight) {
		let height = width * textHeight / textWidth; // scalled text height

		if (height > maxHeight) {
			height = maxHeight;
			width = height * textWidth / textHeight;
		}

		// this is offset so that text is not cropped after viewbox readjustment if it is for example centered
		let viewBoxX = 0;

		// x have to be moved depending on textAnchor. If not than the viewBox crops the text
		let x = this.props.x; // textAnchor === 'start'

		if (this.props.textAnchor === 'middle') {
			viewBoxX = -(textWidth / 2);
			x = this.props.x - width / 2;
		}
		if (this.props.textAnchor === 'end') {
			viewBoxX = -textWidth;
			x = this.props.x - width;
		}

		return {
			viewBox: `${viewBoxX}, -${textHeight}, ${textWidth}, ${textHeight}`, // why -14
			// viewBox: `${viewBoxX}, -14, ${textWidth}, ${textHeight}`, // why -14
			x: x,
			y: this.props.y,
			width: width,
			height: height,
			top: containerHeight - height
		};
	}

	/**
	 * Sets default text width and height as viewbox so text proportions can be kept, while
	 * reseting viewbox to be exactly same as current text size.
	 * It also sets y coord because text gets verticaly aligned after reseting viewbox. Why?
	 * @param {number} textWidth text width with default font size and viewbox
	 * @param {number} textHeight text height with default font size and viewbox
	 * @param {number} width wanted textWidth set in props
	 * @param {number} maxHeight wanted max height set in props when name is for example few chars
	 * @param {number} parentElementHeight height of svg container, where FitrSvgText is rendered
	 */
	fitSvgInSvg(textWidth, textHeight, width, maxHeight, parentElementHeight) {
		let height = width * textHeight / textWidth; // scalled text height

		if (height > maxHeight) {
			height = maxHeight;
			width = height * textWidth / textHeight;
		}

		// after viewbox reset we have to calculate text to top distance to be able to reposition
		const topOffset = (parentElementHeight - height) / 2;

		// this is offset so that text is not cropped after viewbox readjustment if it is for example centered
		let viewBoxX = 0;

		// x have to be moved depending on textAnchor. If not than the viewBox crops the text
		let x = this.props.x; // textAnchor === 'start'

		if (this.props.textAnchor === 'middle') {
			viewBoxX = -(textWidth / 2);
			x = this.props.x - width / 2;
		}
		if (this.props.textAnchor === 'end') {
			viewBoxX = -textWidth;
			x = this.props.x - width;
		}

		return {
			viewBox: `${viewBoxX}, 0, ${textWidth}, ${textHeight}`,
			x: x,
			y: this.props.y - topOffset,
			width: width
		};
	}

	render() {
		return (
			<svg
				style={{
					// border: '1px solid red',
					boxSizing: 'border-box',
					position: this.props.inHtml ? 'absolute' : 'relative',
					top: this.props.inHtml ? this.state.top : undefined
				}}
				ref={node => this.positioner = node}
				width={this.state.width}
				height={this.state.height}
				x={this.state.x}
				y={this.state.y}
			>
				<svg
					// style={{border: '1px solid green'}}
					viewBox={this.state.viewBox}
					// y={50}
				>
					<text
						className={this.props.textClassName}
						ref={node => this.text = node}
						style={{ textAnchor: this.props.textAnchor }}
						// style={{ fontSize: '10px', lineHeight: '10px', textAnchor: this.props.textAnchor }}
						// y={12} // why this works? TODO make text baseline fixed
					>
						{this.props.text}
					</text>
				</svg>
			</svg>
		);
	}
};

FitrSvgText.propTypes = {
	textClassName: PropTypes.string,
	text: PropTypes.string.isRequired,
	textAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	width: PropTypes.any.isRequired,
	maxHeight: PropTypes.any.isRequired
};

FitrSvgText.displayName = 'FitrSvgText';

export default FitrSvgText;