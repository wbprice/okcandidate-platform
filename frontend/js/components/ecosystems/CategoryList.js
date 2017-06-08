import React, { PropTypes, Component } from 'react';
import MultiBackend, { Preview } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import { DragDropContext } from 'react-dnd';
import update from 'immutability-helper';

import CategoryListItem from './../organisms/CategoryListItem';

class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        this.state = {
            categories: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            categories: nextProps.categories
        });
    }

    generatePreview(type, item, style) {
        return (
            <div style={style}>
                <pre>Generated Card</pre>
            </div>
        );
    }

    moveCard(dragIndex, hoverIndex) {
        const {categories} = this.state;
        const dragCategory = categories[dragIndex];

        this.setState(update(this.state, {
            categories: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCategory]
                ]
            }
        }));
    }

    render() {
        return (
            <div className="category-list">
                <Preview generator={this.generatePreview.bind(this)} />
                {
                this.state.categories.map((categoryItem, index) => {
                    return (
                        <CategoryListItem
                            key={index}
                            moveCard={this.moveCard}
                            name={categoryItem.name}
                            icon={categoryItem.icon}
                            rank={categoryItem.rank} />
                    );
                })
                }
            </div>
        );
    }

}

CategoryList.propTypes = {
    categories: PropTypes.array
};

export default DragDropContext(MultiBackend(HTML5toTouch))(CategoryList);
