import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListMajorService {
  constructor() {}

  getColums = () => {
    return [
      { label: 'No', property: 'index', type: 'index', visible: true },

      {
        label: 'ID major',
        property: 'idMajor',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Name major',
        property: 'name',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Description',
        property: 'description',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
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
