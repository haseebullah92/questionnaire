import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | question-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {  
    this.set('question', {
      "question_type": "text",
      "identifier": "date_22039590",
      "headline": "Was wäre Dein Wunschtermin für den Beginn der Privathaftpflichtversicherung?",
      "description": null,
      "required": false,
      "multiline": "false",
      "jumps": []
    });
    this.set('totalQuestions', "10");
    this.set('index', '1');
    await render(hbs`<QuestionForm @question={{this.question}} @index={{this.index}} @totalQuestions={{this.totalQuestions}} />`);

    assert.dom('[data-test-question-form-h3]').hasText('Q 2. Was wäre Dein Wunschtermin für den Beginn der Privathaftpflichtversicherung?',  'question rendered');

  });

  test('should trigger nextQuestion action on button click', async function(assert) {
    this.set('question', {
      "question_type": "text",
      "identifier": "date_22039590",
      "headline": "Was wäre Dein Wunschtermin für den Beginn der Privathaftpflichtversicherung?",
      "description": null,
      "required": false,
      "multiline": "false",
      "jumps": []
    });
    this.set('totalQuestions', "10");
    this.set('index', '1');
    this.set('nextQuestion', (actual) => {
      let expected = 'You are not a wizard!';
      assert.deepEqual(actual.answer[0], expected, 'submitted value is passed to nextQuestion action');
    });
    await render(hbs`<QuestionForm @question={{this.question}} @index={{this.index}} @totalQuestions={{this.totalQuestions}}  @nextQuestion={{action nextQuestion}} />`);
    await fillIn('[data-test-question-form-input]', 'You are not a wizard!');
    await click('[data-test-question-form-button]');
  });
});
