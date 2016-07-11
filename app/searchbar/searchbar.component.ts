/**
 * Created by natete on 10/7/16.
 */
import { Component } from '@angular/core';
import { MDL } from "../shared/MaterialDesignLiteUpgradeElement";
import {QuestionBase} from "../forms/question-base";
import {TextboxQuestion} from "../forms/question-textbox";
import {DynamicFormComponent} from "../forms/dynamic-form.component";
import {DropdownQuestion} from "../forms/question-dropdown";
import {SearchbarService} from "./searchbar.service";
import {SpotifyPreview} from "../previews/preview.implementation";

@Component({
    selector: 'ows-searchbar',
    templateUrl: 'app/searchbar/searchbar.component.html',
    directives: [
        MDL,
        DynamicFormComponent
    ],
    providers: [
        SearchbarService
    ]
})
export class SearchBarComponent {
    questions: QuestionBase<any>[];
    previews: SpotifyPreview[];
    errorMessage: string;
    private _searchbarService: SearchbarService;

    constructor(searchbarService: SearchbarService) {
        this._searchbarService = searchbarService;

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
        this._searchbarService.getPreviews(event.search, event.select)
            .subscribe(
                products => this.previews = products,
                error => this.errorMessage = <any>error
            );
    }
}