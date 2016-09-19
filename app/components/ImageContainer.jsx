import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import InfoModalActionCreator from '../actions/InfoModalActionCreator';
import EditModalActionCreator from '../actions/EditModalActionCreator';
import DataActionCreator from '../actions/DataActionCreator';
import { connect } from 'react-redux';
import { facebookAPI } from '../api/AppAPI';


class ImageContainer extends Component {
    shareImage(){
      facebookAPI.shareImage(this.props.id);
    }
    render(){
        return(
            <Col md={3} sm={4}>
                <div className="img-container">
                    <img src={`/api/v1/images/${this.props.id}/?width=128&height=128`}
                         alt="display"
                         onClick={this.props.openInfoModal.bind(null, this.props.id)} />
                    <div className="img-btn">
                        <Glyphicon glyph="edit" onClick={this.props.openEditModal.bind(null, this.props.id)}/>
                        <Glyphicon glyph="share-alt" onClick={this.shareImage.bind(this)} />
                        <Glyphicon glyph="trash" onClick={this.props.deleteImage.bind(null, this.props.id)}/>
                    </div>
                </div>
            </Col>
        )
    }
}

ImageContainer.proptypes = {
    id: PropTypes.string,
    openInfoModal: PropTypes.func,
    deleteImage: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => {
    return {
        openInfoModal: (id) => dispatch(InfoModalActionCreator.showModal(id)),
        openEditModal: (id) => dispatch(EditModalActionCreator.showModal(id)),
        deleteImage: (id) => dispatch(DataActionCreator.deleteImage(id)),
    }
}

export default connect(null, mapDispatchToProps)(ImageContainer);
