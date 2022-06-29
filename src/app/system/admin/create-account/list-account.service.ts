import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListAccountService {
  constructor() {}

  getColums = () => {
    return [
      { label: 'No', property: 'index', type: 'index', visible: true },

      {
        label: 'Full name',
        property: 'fullName',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Phone number',
        property: 'phoneNumber',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Email',
        property: 'email',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Role name',
        property: 'roleName',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Is active',
        property: 'isActive',
        type: 'checkbox',
        visible: false,
        cssClasses: [],
      },
    ];
  };
}
