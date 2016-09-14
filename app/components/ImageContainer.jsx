import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import InfoModalActionCreator from '../actions/InfoModalActionCreator';
import EditModalActionCreator from '../actions/EditModalActionCreator';
import { connect } from 'react-redux';


class ImageContainer extends Component {
    render(){
        return(
            <Col md={3} sm={4}>
                <div className="img-container">
                    <img src={`/api/v1/images/${this.props.id}/?width=128&height=128`}
                         alt="display"
                         onClick={this.props.openInfoModal.bind(null, this.props.id)} />
                    <div className="img-btn">
                        <Glyphicon glyph="edit" onClick={this.props.openEditModal.bind(null, this.props.id)}/>
                        <Glyphicon glyph="share-alt" />
                        <Glyphicon glyph="trash" />
                    </div>
                </div>
            </Col>
        )
    }
}

ImageContainer.proptypes = {
    id: PropTypes.string,
    openInfoModal: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
    return {
        openInfoModal: (id) => dispatch(InfoModalActionCreator.showModal(id)),
        openEditModal: (id) => dispatch(EditModalActionCreator.showModal(id))
    }
}

export default connect(null, mapDispatchToProps)(ImageContainer);
