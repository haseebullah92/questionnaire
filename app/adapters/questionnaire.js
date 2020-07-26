import Adapter from '@ember-data/adapter';
import questionnaire from 'questionnaire/json/questionnaire';

export default class QuestionnaireAdapter extends Adapter {
    findRecord(store, type, query) {
        //Retrive current questionnaire by id
        return questionnaire;
    }
}
