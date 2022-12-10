import { Component, OnDestroy } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Component({
    template: ''
})
export class BaseComponent implements OnDestroy{
    destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(){}

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}