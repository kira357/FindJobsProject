import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'custom-button',
    templateUrl: './custom-button.component.html',
    styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent implements OnInit {
    @Input() type: 'delete' | 'reset' | 'excel' | 'search' | 'close' | 'closeAll' | 'create' | 'print' | 'resetPassword' | 'erp' | 'upload' | 'save' | 'view' = 'save';
    @Input() text: string | null = null;
    @Input() disabled: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}
