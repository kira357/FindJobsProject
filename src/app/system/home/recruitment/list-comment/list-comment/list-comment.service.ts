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
                label: "TradeType",
                property: 'tradeTypeName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "CustomerCode",
                property: 'customerCode',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "FullName",
                property: 'supplierName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "ShortName",
                property: 'supplierShortName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },

            {
                label: "Code",
                property: 'ifCode',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "CustomerType",
                property: 'customerTypeName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "Country",
                property: 'CountryTypeName',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: "SysUser",
                property: 'sysUserYn',
                type: 'checkbox',
                visible: true,
                cssClasses: []
            },
            {
                label: "Active",
                property: 'activeYn',
                type: 'checkbox',
                visible: true,
                cssClasses: []
            },
            {
                label: "LasterETL",
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
            }
        ];
    };
}
