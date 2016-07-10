import { Component, Input } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { QuestionBase }     from './question-base';
import {MDL} from "../shared/MaterialDesignLiteUpgradeElement";
@Component({
    selector: 'df-question',
    templateUrl: 'app/searchbar/dynamic-form-question.component.html',
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        MDL
    ],
    styleUrls: ['app/searchbar/dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {
    @Input() question: QuestionBase<any>;
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.question.key].valid; }
}
