import fetch from 'isomorphic-fetch';
import checkStatus from './../utils/checkStatus';
import { gotoRoute } from './router-actions';

export const FETCH_CATEGORY_LIST_REQUEST = 'FETCH_CATEGORY_LIST_REQUEST';
export const FETCH_CATEGORY_LIST_SUCCESS = 'FETCH_CATEGORY_LIST_SUCCESS';
export const FETCH_CATEGORY_LIST_FAILURE = 'FETCH_CATEGORY_LIST_FAILURE';

export function fetchCategoryListRequest() {
    return {
        type: FETCH_CATEGORY_LIST_REQUEST
    };
}

export function fetchCategoryListSuccess(response) {
    return {
        type: FETCH_CATEGORY_LIST_SUCCESS,
        response
    };
}

export function fetchCategoryListFailure(response) {
    return {
        type: FETCH_CATEGORY_LIST_FAILURE,
        response
    };
}

export function fetchCategoryList() {
    return function(dispatch) {
        dispatch(fetchCategoryListRequest());
        return fetch('/api/v1/category')
            .then(checkStatus)
            .then(response => response.json())
            .then(response => {
                dispatch(fetchCategoryListSuccess(response));
            })
            .catch(error => dispatch(fetchCategoryListFailure(error)));
    };
}

export const SET_CATEGORY_ORDER = 'SET_CATEGORY_ORDER';
export function setCategoryOrder(category) {
    return {
        type: SET_CATEGORY_ORDER,
        categories: category.categories
    };
}

export const POST_CATEGORY_ORDER_REQUEST = 'POST_CATEGORY_ORDER_REQUEST';
export const POST_CATEGORY_ORDER_SUCCESS = 'POST_CATEGORY_ORDER_SUCCESS';
export const POST_CATEGORY_ORDER_FAILURE = 'POST_CATEGORY_ORDER_FAILURE';

export function postCategoryOrderRequest(categories) {
    return {
        type: POST_CATEGORY_ORDER_REQUEST,
        categories
    };
}

export function postCategoryOrderSuccess(response) {
    return {
        type: POST_CATEGORY_ORDER_SUCCESS,
        response
    };
}

export function postCategoryOrderFailure(error) {
    return {
        type: POST_CATEGORY_ORDER_FAILURE,
        error
    };
}

export function postCategoryOrder(SurveyResultId, Categories, callback) {

    const SurveyResultCategories = Categories.map((cat, index) => {
        return {
            SurveyResultId,
            CategoryId: cat.id,
            rank: index + 1
        };
    });

    return (dispatch) => {
        dispatch(postCategoryOrderRequest());
        return fetch('/api/v1/surveyresultcategory/rank', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                SurveyResultCategories
            })
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(response => {
                dispatch(postCategoryOrderSuccess(response));
                callback && callback(null, response);
            })
            .catch(error => {
                dispatch(postCategoryOrderFailure(error));
                callback && callback(error);
            });
    };
}

