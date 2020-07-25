import Route from '@ember/routing/route';

export default class QuestionnaireQuestionnaireRoute extends Route {
  model({ id }) {
    return this.store.findRecord('questionnaire', id);
  }
}
