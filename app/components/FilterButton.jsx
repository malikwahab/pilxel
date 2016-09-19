import React, { Component, PropTypes } from 'react';

class FilterButton extends Component {
  render() {
    return (
      <div className="filter-btn" onClick={this.props.filterAction}>
        <img src={this.props.imgSrc} />
        <span className="edit-btn-title">{this.props.filterTitle}</span>
      </div>
    )
  }
}

FilterButton.proptypes = {
  imgSrc: PropTypes.string,
  filterTitle: PropTypes.string,
  filterAction: PropTypes.func
}

export default FilterButton;
