import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class QuestionnaireFormComponent extends Component {
  @service store;

  @service questionnaire;
  @tracked questions = [];
  @tracked questionsLoop = [];
  @tracked answers = [];
  @service router;

  constructor() {
    super(...arguments);
    const questions = this.args.questionnaire.get("questions");
    this.questions = [];
    questions.map(question => {
      this.questions.pushObject({
        question_type: question.get("question_type"),
        identifier: question.get("identifier"),
        headline: question.get("headline"),
        description: question.get("description"),
        required: question.get("required"),
        multiple: question.get("multiple"),
        choices: question.get("choices"),
        jumps: question.get("jumps")
      });
    });
  }

  @action
  async nextQuestion(e, next) {
    e.preventDefault();
    if (next.finish) {
      this.router.transitionTo('thankyou');
    }
    else {
      if (next.next){      
        const currentIndex = this.questionsLoop.findIndex(x => x.identifier == next.identifier);
        const deleteCount = this.questionsLoop.length - currentIndex;
          this.questionsLoop.splice(currentIndex + 1, deleteCount);     
        const nextIndex = this.questions.findIndex(x => x.identifier == next.next); 
        this.questionsLoop.pushObject({
          ...this.questions[nextIndex],
          questionIndex: nextIndex,
        });
      } else {
        const nextIndex = this.questions.findIndex(x => x.identifier == next.identifier) + 1;
        const nextQuestion = this.questions[nextIndex];
        const existingIndex = this.questionsLoop.findIndex(x => x.identifier == nextQuestion.identifier);
        if (existingIndex === -1) {
          this.questionsLoop.pushObject({
            ...nextQuestion,
            questionIndex: nextIndex,
          });         
        }      
      }    
    }    
  }

  @action
  async submit(e) {
    e.preventDefault();
    this.questionsLoop = [];
    this.questionsLoop.pushObject({
      ...this.questions[0],
      questionIndex: 1
    });  
  }
}
