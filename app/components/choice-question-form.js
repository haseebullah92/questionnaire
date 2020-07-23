import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ChoiceQuestionFormComponent extends Component {
  @tracked question = {};
  @tracked index;
  @tracked total;
  @tracked questionIndex;
  @tracked nextQuestion;

  constructor() {
    super(...arguments);
    debugger;
    this.question = this.args.question;
    this.index = this.args.index + 1;
    this.total = this.args.total;
    this.questionIndex = this.args.questionIndex;
    this.nextQuestion = this.args.nextQuestion;
  }

  @action
  async submit(e) {
    debugger;
    let next = "";
    if (this.question.jumps.length > 0) {
      for (let jump of this.question.jumps) {        
        for (let condition of jump.conditions) {
          if (condition.field == this.question.identifier && condition.value == this.value)
          {
            next = jump.destination.id;
          }
        }
      }
    }
    debugger;
    let model = {
      index: this.questionIndex,
      next: next,
      identifier: this.question.identifier,
      answer: this.value,
    }
    this.nextQuestion(e, model);
  }
}
