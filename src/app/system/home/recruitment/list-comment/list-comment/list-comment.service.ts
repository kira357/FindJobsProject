import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ListCommentService {
    constructor() {}

    getColums = () => {
        return [
            { label: 'No', property: 'index', type: 'index', visible: true },

            {
                label: "User name",
                property: 'userName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Job name",
                property: 'jobName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Comment",
                property: 'commentMsg',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Comment create",
                property: 'commentDate',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },

        
        ];
    };
}
