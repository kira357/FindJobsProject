import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListCVService {
  constructor() {}

  getColums = () => {
    return [
      { label: '', property: 'checkboxCol', type: '', visible: true },
      { label: 'No', property: 'index', type: 'index', visible: true },
      {
        label: 'Name candidate',
        property: 'nameCandidate',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Name Jobs',
        property: 'nameJob',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Introduction',
        property: 'introduction',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Date apply',
        property: 'dateApply',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },

      {
        label: 'Resume',
        property: 'resume',
        type: 'file',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Accpect CV',
        property: 'isPending',
        type: 'pending',
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
