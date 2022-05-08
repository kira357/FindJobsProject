import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListRoleService {
  constructor() {}

  getColums = () => {
    return [
      { label: 'No', property: 'index', type: 'index', visible: true },

      {
        label: 'Role name',
        property: 'supplierShortName',
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
        label: 'Active',
        property: 'activeYn',
        type: 'checkbox',
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
