/**
 * Created by natete on 10/7/16.
 */
import { Component, Inject, ElementRef, OnInit } from '@angular/core';
import { MDL } from "../shared/MaterialDesignLiteUpgradeElement";
import {QuestionBase} from "./question-base";
import {TextboxQuestion} from "./question-textbox";
import {DynamicFormComponent} from "./dynamic-form.component";

@Component({
    selector: 'ows-searchbar',
    templateUrl: 'app/searchbar/searchbar.component.html',
    directives: [
        MDL,
        DynamicFormComponent
    ]
})
export class SearchBarComponent {
    questions: QuestionBase<any>[];

    constructor() {
        this.questions = [
            new TextboxQuestion({
                key: 'search',
                label: 'Search',
                value: '',
                required: false,
                order: 1
            })
        ]
    }
}