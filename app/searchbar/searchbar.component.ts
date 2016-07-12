/**
 * Created by natete on 10/7/16.
 */
import { Component } from '@angular/core';
import { MDL } from "../shared/MaterialDesignLiteUpgradeElement";
import {QuestionBase} from "../forms/question-base";
import {TextboxQuestion} from "../forms/question-textbox";
import {DynamicFormComponent} from "../forms/dynamic-form.component";
import {DropdownQuestion} from "../forms/question-dropdown";
import {Router} from "@angular/router";

@Component({
    selector: 'ows-searchbar',
    templateUrl: 'app/searchbar/searchbar.component.html',
    directives: [
        MDL,
        DynamicFormComponent
    ],
    providers: [
    ]
})
export class SearchBarComponent {
    questions: QuestionBase<any>[];

    private _router: Router;

    constructor(router: Router) {
        this._router = router;

        this.questions = [
            new TextboxQuestion({
                key: 'search',
                label: 'Search',
                value: '',
                required: false,
                order: 1
            }),
            new DropdownQuestion({
                key: 'select',
                label: 'Select',
                value: '',
                required: false,
                order: 1,
                options: [
                    { key: 'track', value: 'Title' },
                    { key: 'artist', value: 'Artist' },
                    { key: 'album', value: 'Album'}
                ]
            })
        ]
    }

    onFormSubmitted(event) {
        this._router.navigate(['/previews'], { queryParams: { q: event.search, type: event.select }});
    }
}