import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ListCVService {
    constructor() {}

    getColums = () => {
        return [
            { label: '', property: 'checkboxCol', type: '', visible: true },
            { label: 'No', property: 'index', type: 'index', visible: true },
            {
                label: "Name CV",
                property: 'customerCode',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Id student",
                property: 'supplierName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Name student",
                property: 'supplierShortName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },

            {
                label: "Major",
                property: 'ifCode',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Grannd",
                property: 'customerTypeName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Day request",
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
