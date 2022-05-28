import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class RecruitmentListPostService {
    constructor() {}

    getColums = () => {
        return [
          { label: '', property: 'checkboxCol', type: 'checkboxCol', visible: true },
          
          { label: 'No', property: 'index', type: 'index', visible: true },
    
          {
            label: 'image',
            property: 'image',
            type: 'image',
            visible: true,
            cssClasses: [],
          },
          {
            label: 'Title',
            property: 'title',
            type: 'text',
            visible: true,
            cssClasses: ['text-secondary', 'font-medium', 'w-96','break-all'],
          },
          {
            label: 'Name major',
            property: 'nameMajor',
            type: 'text',
            visible: true,
            cssClasses: ['text-secondary', 'font-medium'],
          },
          {
            label: 'Summary',
            property: 'summary',
            type: 'text',
            visible: true,
            cssClasses: ['text-secondary', 'font-medium', 'w-96','break-all'],
          },
          {
            label: 'View',
            property: 'view',
            type: 'text',
            visible: true,
            cssClasses: ['text-secondary', 'font-medium'],
          },
    
          {
            label: 'Date Post',
            property: 'datePost',
            type: 'text',
            visible: true,
            cssClasses: ['text-secondary', 'font-medium'],
          },
          {
            label: 'Active',
            property: 'isActive',
            type: 'yn',
            visible: true,
            cssClasses: [],
          },
          {
            label: 'Actions',
            property: 'button',
            type: 'button',
            visible: true,
            buttons: ['delete', 'edit'],
          },
        ];
      };
}
