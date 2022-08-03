// 1. It should show the progress
// 2. Show the percentage of completion in text
// 3. Color, width

import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";


const Span = Styled.span`
  width: 10%;
  text-align:right;
  `
const Container = Styled.div`
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  width: 90%;
  padding:5px;

  progress {
    margin-right: 8px;
  }

  progress[value] {
  width: ${props => props.width};

    -webkit-appearance: none;
    appearance: none;
  }

  progress[value]::-webkit-progress-bar {
    height: 15px;

    background-color: #eee;
  }  

  progress[value]::-webkit-progress-value {
    height: 15px;
    background-color: ${props => props.color};
  }
`;

const ProgressBar = ({ value, max, color, width, isPositive }) => {

  return (
    <Container color={color} width={width}>
      <progress value={ isPositive ? value : max-value} max={max} />
      <Span>
        { isPositive ? Math.round((value / max) * 100) : Math.round((1- (value/max)) * 100)}%
      </Span> 
    </Container>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.string,
  isPositive: PropTypes.bool
};

ProgressBar.defaultProps = {
  max: 100,
  color: "lightBlue",
  width: "250px"
};

export default ProgressBar;
