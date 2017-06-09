'use strict';

import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import React, { Component, PropTypes } from 'react';
import Icon from './../atoms/Icon';

const ItemTypes = {
    CARD: 'card'
};

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        };
    }
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
            return;
        }

        // bounding rect
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // mouse offset
        const clientOffset = monitor.getClientOffset();

        // get pixels to top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        // monitor.getItem().index = hoverIndex;
    }
};

class CategoryListItemName extends Component {
    render() {
        const {
            connectDragSource,
            connectDropTarget,
            isDragging
        } = this.props;

        return connectDragSource(connectDropTarget(
            <div className={`category-name card ${isDragging ? 'hidden' : ''}`}>
                {
                    this.props.icon &&
                    <Icon className="medium padding">{this.props.icon}</Icon>
                }
                <span className="category-name-label">{this.props.name}</span>
            </div>
        ));
    }
}

CategoryListItemName.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    icon: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
    index: PropTypes.number
};

const DragCategoryListItemName = DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))(CategoryListItemName);

const DragDropCategoryListItemName  = DropTarget(ItemTypes.CARD, cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))(DragCategoryListItemName);

export default DragDropCategoryListItemName;
