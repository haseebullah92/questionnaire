import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { inject as service } from '@ember/service';

export default class QuestionnaireModel extends Model {
  @attr identifier;
  @attr name;
  @attr description;
  @attr category_name_hyphenated;
  @hasMany('question') questions;
}
