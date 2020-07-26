import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { filterBy } from '@ember/object/computed';

export default class MultiChoiceQuestionFormComponent extends Component {
  @tracked question = {};
  @tracked submitted = false;
  @tracked value = [];

  constructor() {
    super(...arguments);
    this.question = this.args.question;   
  }

  @action
  async change(e) {   
    let value = e.currentTarget.dataset.value;
    if (e.currentTarget.checked) {
      this.value.pushObject(value);
    } else {
      let existingIndex = this.value.findIndex(x => x === value);
      if (existingIndex > -1) {
        this.value.removeAt(existingIndex);   
      }
    }
  }

  @action
  async submit(e) {
    this.submitted = true;
    if (!this.question.required || this.value.length > 0) {
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
      
      let model = {
        index: this.question.questionIndex,
        next: next,
        identifier: this.question.identifier,
        answer: this.value,
        finish: this.question.questionIndex === this.totalQuestions
      }
      this.args.nextQuestion(e, model);
    }    
  }
}
