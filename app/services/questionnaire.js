import Service from '@ember/service';
import { action } from '@ember/object';
import questionnaire from 'questionnaire/json/questionnaire';

export default class QuestionnaireService extends Service {

  get questionnaireJson() {
    return questionnaire;
  }

  @action
  async saveQuestionnaire() {
    //Save Questionnaire here in database
  }
}
