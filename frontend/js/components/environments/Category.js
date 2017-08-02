'use strict';

import React, { PropTypes, Component } from 'react';

import { connect } from 'react-redux';

import CategoryList from '../ecosystems/CategoryList';
import LoadingIndicator from './../organisms/LoadingIndicator';
import { gotoRoute } from './../../redux/actions/router-actions';

import {
    fetchCategoryList,
    postCategoryOrder
} from './../../redux/actions/category-actions';

import {
    fetchSurveyResult
} from './../../redux/actions/survey-actions';

class Category extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchSurveyResult(this.props.params.id));
        this.props.dispatch(fetchCategoryList());
    }

    submit() {
        this.props.dispatch(
            postCategoryOrder(
                this.props.category.SurveyResultId,
                this.props.category.categories,
                (error) => {
                    if (!error) {
                        gotoRoute(`/survey/${this.props.params.id}/questions`);
                    }
                }
            )
        );
    }

    render() {
        // const categories = this.props.category.categories;
        let categories = [];
        const SurveyResultCategories = this.props.category.SurveyResultCategories;
        const Categories = this.props.category.categories;

        // If user has already sorted categories, sort the categories in that order.
        if (SurveyResultCategories.length) {
            categories = SurveyResultCategories.reduce((memo, value) => {
                memo[value.rank - 1] = Categories.find(cat => cat.id === value.CategoryId);
                return memo;
            }, new Array(SurveyResultCategories.length));
        }
        // Otherwise, display them in the order the API returned them.
        else {
            categories = Categories;
        }

        return (
            <div className="container">

                <p>Sort these categories in order of importance to you.</p>

                {
                    !categories.length &&
                    <LoadingIndicator message="Loading Issues" />
                }

                <CategoryList
                    dispatch={this.props.dispatch}
                    categories={categories} />

                <button onClick={this.submit.bind(this)}>Submit</button>

            </div>
        );
    }
}

Category.propTypes = {
    category: PropTypes.object,
    ui: PropTypes.object,
    login: PropTypes.object,
    survey: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.object,
    router: PropTypes.object
};

export default connect(
    state => ({
        ui: state.ui,
        login: state.login,
        category: state.category
    })
)(Category);
