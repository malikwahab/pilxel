import React, {Component, PropTypes} from 'react';
import FilterButton from './FilterButton';
import EditButton from './EditButton';
import ImageEditActionCreator from '../actions/ImageEditActionCreator';
import {connect} from 'react-redux';

class Filters extends Component {
  render() {
    const filters = [
      {
        filterTitle: "Blur",
        imgSrc: "/static/img/blur.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "blur", this.props.autoSave)
      },
      {
        filterTitle: "Contour",
        imgSrc: "/static/img/contour.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "contour", this.props.autoSave)
      },
      {
        filterTitle: "Detail",
        imgSrc: "/static/img/details.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "detail", this.props.autoSave)
      },
      {
        filterTitle: "Edge",
        imgSrc: "/static/img/edge.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "edge_ehnance", this.props.autoSave)
      },
      {
        filterTitle: "Edge More",
        imgSrc: "/static/img/edge-more.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "edge_enhance_more", this.props.autoSave)
      },
      {
        filterTitle: "Sharpen",
        imgSrc: "/static/img/sharpen.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "sharpen", this.props.autoSave)
      },
      {
        filterTitle: "Emboss",
        imgSrc: "/static/img/emboss.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "emboss", this.props.autoSave)
      },
      {
        filterTitle: "Find Edges",
        imgSrc: "/static/img/find-edges.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "find_edges", this.props.autoSave)
      },
      {
        filterTitle: "smooth",
        imgSrc: "/static/img/smooth.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "smooth_more", this.props.autoSave)
      },
      {
        filterTitle: "SmoothMore",
        imgSrc: "/static/img/smooth-more.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "smooth_more", this.props.autoSave)
      },
      {
        filterTitle: "Aqua",
        imgSrc: "/static/img/aqua.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "aqua", this.props.autoSave)
      },
      {
        filterTitle: "Sepia",
        imgSrc: "/static/img/sepia.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "sepia", this.props.autoSave)
      },
      {
        filterTitle: "Ice",
        imgSrc: "/static/img/ice.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "ice", this.props.autoSave)
      },
      {
        filterTitle: "Molten",
        imgSrc: "/static/img/molten.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "molten", this.props.autoSave)
      },
      {
        filterTitle: "GlowingEdge",
        imgSrc: "/static/img/glowing-edge.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "glowingedge", this.props.autoSave)
      },
      {
        filterTitle: "Mosaic",
        imgSrc: "/static/img/mosaic.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "mosaic", this.props.autoSave)
      },
      {
        filterTitle: "Pencil",
        imgSrc: "/static/img/pencil.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "pencil", this.props.autoSave)
      },
      {
        filterTitle: "Pinch",
        imgSrc: "/static/img/pinch.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "pinch", this.props.autoSave)
      },
      {
        filterTitle: "Comic",
        imgSrc: "/static/img/comic.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "comic", this.props.autoSave)
      },
      {
        filterTitle: "Solarize",
        imgSrc: "/static/img/solarize.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "solarize", this.props.autoSave)
      },
      {
        filterTitle: "Oil Painting",
        imgSrc: "/static/img/oil-painting.png",
        filterAction: this.props.filter.bind(this, this.props.currentEditImage, "oilpainting", this.props.autoSave)
      },
    ];
    return (
      <div className="edit-btn-container filters">
        <EditButton icon="keyboard_arrow_left" title="back" edit={this.props.close} />
        <div className="filter-btn-container">
          <div className="filter-btn-wrapper">
            {filters.map((filter, i) => {
                return (<FilterButton key={i} {...filter}/>)
            })}
          </div>
        </div>
      </div>
    )
  }
}

Filters.proptypes = {
  autoSave: PropTypes.bool,
  currentEditImage: PropTypes.string,
  close: PropTypes.func
}

const mapStateToProps = (state) => {
  return  {
    autoSave: state.imageEdit.autoSave,
    currentEditImage: state.imageEdit.currentEditImage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(ImageEditActionCreator.toggleFilterShow()),
    filter: (id, type, autoSave) => dispatch(ImageEditActionCreator.filter(id, type, autoSave))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
