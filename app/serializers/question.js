import JSONSerializer from '@ember-data/serializer/json';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class QuestionnaireSerializer extends JSONSerializer.extend(EmbeddedRecordsMixin) {
  primaryKey = 'identifier';
  attrs = {
    questionnaire: { embedded: 'always' }
  };
}