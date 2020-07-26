import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class QuestionFormComponent extends Component {
  @tracked question = {};
  @tracked submitted = false;

  constructor() {
    super(...arguments);
    this.question = this.args.question;      
  }

  @action
  async submit(e) {
    e.preventDefault();
    this.submitted = true;
    if (!this.question.required || this.value) {
      let next = "";
      if (this.question.jumps.length > 0) {
        for (const jump of this.question.jumps) {        
          for (const condition of jump.conditions) {
            if (condition.field == this.question.identifier && condition.value == this.value)
            {
              next = jump.destination.id;
            }
          }
        }
      }
      
      const model = {
        index: this.question.questionIndex,
        next: next,
        identifier: this.question.identifier,
        answer: [this.value],
        finish: (this.question.questionIndex + 1) === this.args.totalQuestions
      }
      this.args.nextQuestion(model);
    }    
  }
}
