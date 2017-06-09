import React, { PropTypes, Component } from 'react';

import CategoryListItemName from './../organisms/CategoryListItemName';

class CategoryListItem extends Component {
    render() {
        return (
            <div className="category-list-item">
                <div className="rank">
                    <label>{this.props.index + 1}</label>
                </div>

                <CategoryListItemName
                    moveCard={this.props.moveCard}
                    icon={this.props.icon}
                    name={this.props.name}
                    index={this.props.index}
                    id={this.props.id}
                />
          </div>
        );
    }
}

CategoryListItem.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.string,
    index: PropTypes.number,
    moveCard: PropTypes.func,
    id: PropTypes.number
};

export default CategoryListItem;
