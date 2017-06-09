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
                    moveCard={this.moveCard}
                    icon={this.props.icon}
                    name={this.props.name}
                />
          </div>
        );
    }
}

CategoryListItem.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.string,
    index: PropTypes.number
};

export default CategoryListItem;
