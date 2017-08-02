'use strict';

const Controller = require('trails-controller');
const Boom = require('boom');

/**
 * @module SurveyResultCategoryController
 * @description TODO document Controller.
 */
module.exports = class SurveyResultCategoryController extends Controller {

    rank(request, reply) {
        const SurveyResultCategories = request.payload.SurveyResultCategories;

        // Check to see if these are new records (no ID)
        const newRecords = SurveyResultCategories.some(src => !src.id);

        if (newRecords) {
            return Promise.all(SurveyResultCategories.map(src => {
                return this.app.orm.SurveyResultCategory.create({
                    SurveyResultId: src.SurveyResultId,
                    CategoryId: src.CategoryId,
                    rank: src.rank
                });
            }))
                .then(records => {
                    reply(records);
                })
                .catch(error => {
                    reply(Boom.badRequest(error));
                });
        }

        else {
            return Promise.all(SurveyResultCategories.map(src => {
                return this.app.orm.SurveyResultCategory.update({
                    where: {id: src.id},
                    rank: src.rank
                });
            }))
                .then(records => {
                    reply(records);
                })
                .catch(error => {
                    reply(Boom.badRequest(error));
                });
        }
    }
};
