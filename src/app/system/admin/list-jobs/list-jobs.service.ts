import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ListJobsService {
    constructor() {}

    getColums = () => {
        return [
            { label: 'No', property: 'index', type: 'index', visible: true },

            {
                label: "image",
                property: 'image',
                type: 'image',
                visible: true,
                cssClasses: []
            },
            {
                label: "Name jobs",
                property: 'customerCode',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Major",
                property: 'supplierName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "position",
                property: 'supplierShortName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },

            {
                label: "Amount",
                property: 'ifCode',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Work time",
                property: 'customerTypeName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Address",
                property: 'CountryTypeName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Salary",
                property: 'Salary',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Day expire",
                property: 'etlDate',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Description",
                property: 'description',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Active",
                property: 'activeYn',
                type: 'checkbox',
                visible: true,
                cssClasses: []
            },
        ];
    };
}
