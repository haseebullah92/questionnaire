import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class QuestionFormComponent extends Component {
  @tracked question = {};
  @tracked details = {};
  @tracked index;

  constructor() {
    super(...arguments);
    this.question = this.args.question.question;
    this.index = this.args.index + 1;
    this.details = this.args.question.details;
    setTimeout(() => {
      document.getElementById(this.question.identifier).scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100); 
  }

  @action
  async submit(e) {
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
    
    let model = {
      index: this.details.questionIndex,
      next: next,
      identifier: this.question.identifier,
      answer: this.value,
      finish: this.details.questionIndex === this.details.totalQuestions
    }
    this.details.nextQuestion(e, model);
  }
}
