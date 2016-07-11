import { Component, Input, Output, EventEmitter, OnInit }  from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { QuestionBase }                 from './question-base';
import { QuestionControlService }       from './question-control.service';
@Component({
    selector: 'dynamic-form',
    templateUrl: 'app/forms/dynamic-form.component.html',
    directives: [
        DynamicFormQuestionComponent,
        REACTIVE_FORM_DIRECTIVES
    ],
    styleUrls: [
        'app/forms/dynamic-form.component.css'
    ],
    providers:  [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {
    @Input() questions: QuestionBase<any>[] = [];
    @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;
    // payLoad = '';
    constructor(private qcs: QuestionControlService) {  }
    ngOnInit() {
        this.form = this.qcs.toFormGroup(this.questions);
    }
    onSubmit() {
        // this.payLoad = JSON.stringify(this.form.value);
        this.formSubmitted.emit(this.form.value);
    }
}
