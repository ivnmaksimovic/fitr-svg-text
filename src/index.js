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

		this.fitSvg = this.fitSvg.bind(this);
	}

	componentDidMount() {
		this.setState(() => this.getNewDimensions());
	}

	componentDidUpdate(prevProps) {
		if (this.props.text !== prevProps.text) {
			this.setState(() => this.getNewDimensions());
		}
	}

	getNewDimensions() {
		const textWidth = this.text.getBBox().width; // default text width
		const textHeight = this.text.getBBox().height; // default text height
		this.parentSvg = this.positioner.parentNode.closest("svg");
		this.parentSvgHeight = this.positioner.parentNode
			.closest("svg")
			.getBoundingClientRect()
			.height; // height of container svg

		return this.fitSvg(textWidth, textHeight, this.props.width, this.props.maxHeight, this.parentSvgHeight);
	}

	/**
	 * Sets default text width and height as viewbox so text proportions can be kept, while
	 * reseting viewbox to be exactly same as current text size.
	 * It also sets y coord because text gets verticaly aligned after reseting viewbox. Why?
	 * @param {number} textWidth text width with default font size and viewbox
	 * @param {number} textHeight text height with default font size and viewbox
	 * @param {number} width wanted textWidth set in props
	 * @param {number} maxHeight wanted max height set in props when name is for example few chars
	 * @param {number} parentSvgHeight height of svg container, where FitrSvgText is rendered
	 */
	fitSvg(textWidth, textHeight, width, maxHeight, parentSvgHeight) {
		let height = width * textHeight / textWidth; // scalled text height

		if (height > maxHeight) {
			height = maxHeight;
			width = height * textWidth / textHeight;
		}

		// after viewbox reset we have to calculate text to top distance to be able to reposition
		const topOffset = (parentSvgHeight - height) / 2;

		// this is offset so that text is not cropped after viewbox readjustment if it is for example centered
		let viewBoxX = 0;

		// x have to be moved depending on textAnchor. If not than the viewBox can crops the text
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
				ref={node => this.positioner = node}
				width={this.state.width} x={this.state.x} y={this.state.y}
			>
				<svg viewBox={this.state.viewBox} >
					<text
						className={this.props.textClassName}
						ref={node => this.text = node}
						style={{ textAnchor: this.props.textAnchor }}
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
	width: PropTypes.number.isRequired,
	maxHeight: PropTypes.number.isRequired
};

FitrSvgText.displayName = 'FitrSvgText';

export default FitrSvgText;