import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class QuestionnaireFormComponent extends Component {
  @service questionnaire;
  @tracked questionnaireModel = {};
  @tracked questions = [];
  @tracked answers = [];
  @service router;

  constructor() {
    super(...arguments);
    this.questionnaireModel = this.questionnaire.questionnaireJson;
  }

  @action
  async nextQuestion(e, next) {
    e.preventDefault();
    if (next.finish) {
      this.router.transitionTo('thankyou');
    }
    else {
      if (next.next){      
        let currentIndex = this.questions.findIndex(x => x.question.identifier == next.identifier);
        let deleteCount = this.questions.length - currentIndex;
        this.questions.splice(currentIndex + 1, deleteCount);
        let nextIndex = this.questionnaireModel.questions.findIndex(x => x.identifier == next.next);
        this.questions.pushObject({
          question: {...this.questionnaireModel.questions[nextIndex]}, 
          details: {
            questionIndex: nextIndex + 1,
            totalQuestions: this.questionnaireModel.questions.length,
            nextQuestion: this.nextQuestion
          }      
        }); 
      } else {
        let nextIndex = this.questionnaireModel.questions.findIndex(x => x.identifier == next.identifier) + 1;
        let nextQuestion = this.questionnaireModel.questions[nextIndex];
        let existingIndex = this.questions.findIndex(x => x.question.identifier == nextQuestion.identifier);
        if (existingIndex === -1) {
          this.questions.pushObject({
            question: {...nextQuestion}, 
            details: {
              questionIndex: nextIndex + 1,
              totalQuestions: this.questionnaireModel.questions.length,
              nextQuestion: this.nextQuestion
            }      
          });          
        }      
      }    
    }    
  }

  @action
  async submit(e) {
    e.preventDefault();
    this.questions.pushObject({
      question: {...this.questionnaireModel.questions[0]}, 
      details: {
        questionIndex: 1,
        totalQuestions: this.questionnaireModel.questions.length,
        nextQuestion: this.nextQuestion
      }      
    });
  }
}
