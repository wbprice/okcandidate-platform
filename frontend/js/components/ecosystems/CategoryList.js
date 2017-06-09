import React, { PropTypes, Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
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
                {
                    this.state.categories.map((categoryItem, index) => {
                        return (
                            <CategoryListItem
                                key={index}
                                moveCard={this.moveCard}
                                id={categoryItem.id}
                                index={index}
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

export default DragDropContext(HTML5Backend)(CategoryList);
