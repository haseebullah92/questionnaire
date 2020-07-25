import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { inject as service } from '@ember/service';

export default class QuestionModel extends Model {
  //@service session;

  @attr question_type;
  @attr identifier;
  @attr headline;
  @attr description;
  @attr required;
  @attr multiple;
  @attr choices;
  @attr jumps;
  @attr display;

  @belongsTo('questionnaire') questionnaire;
}
