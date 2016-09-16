import React, { Component, PropTypes } from 'react';
import InputSlider from 'react-input-range';
import EditButton from './EditButton';
import ImageEditActionCreator from '../actions/ImageEditActionCreator';
import { connect } from 'react-redux';


class RangeEditButton extends Component {
  constructor() {
    super();
    this.state = {
      x: 0
    }
  }
  handleValueChange(component, value) {
    this.setState({x: value});
  }
  handleChangeComplete(component, value) {
    this.props.onChangeComplete(this.props.currentEditImage, value, this.props.autoSave);
  }
  render() {
    return (
      <div className="range-edit">
        <EditButton icon="keyboard_arrow_left" title="back" edit={this.props.close}/>
        <div className="range-edit-slider">
          <InputSlider
            axis="x"
            value={this.state.x}
            maxValue={this.props.max}
            minValue={this.props.min}
            defaultValue={this.props.defaultValue}
            onChange={this.handleValueChange.bind(this)}
            onChangeComplete={this.handleChangeComplete.bind(this)} />
        </div>
      </div>
    )
  }
}

RangeEditButton.proptypes = {
    autoSave: PropTypes.bool,
    currentEditImage: PropTypes.string,
    close: PropTypes.func,
    onChangeComplete: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    defaultValue: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
      autoSave: state.imageEdit.autoSave,
      currentEditImage: state.imageEdit.currentEditImage
  }
}

export default connect(mapStateToProps)(RangeEditButton);
