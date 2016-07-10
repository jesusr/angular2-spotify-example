/**
 * Created by natete on 10/7/16.
 */
import { Directive, AfterViewInit } from '@angular/core';
declare var componentHandler: any;

@Directive({
    selector: '[mdl]'
})
export class MDL implements AfterViewInit {
    ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
    }
}
