import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecruitmentListJobsService {
  constructor() {}

  getColums = () => {
    return [
      { label: '', property: 'checkboxCol', type: 'checkboxCol', visible: true },
      
      { label: 'No', property: 'index', type: 'index', visible: true },

      {
        label: 'image',
        property: 'jobImage',
        type: 'image',
        visible: true,
        cssClasses: [],
      },
      {
        label: 'company of jobs',
        property: 'companyOfJobs',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Name job',
        property: 'name',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium', 'w-72','break-all'],
      },
      {
        label: 'position',
        property: 'position',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },

      {
        label: 'Amount',
        property: 'amount',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Work time',
        property: 'workTime',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Address',
        property: 'address',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium','w-72','break-all'],
      },
      {
        label: 'Salary min',
        property: 'salaryMin',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Salary max',
        property: 'salaryMax',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium'],
      },
      {
        label: 'Day expire',
        property: 'dateExpire',
        type: 'text',
        visible: true,
        cssClasses: ['text-secondary', 'font-medium','w-44'],
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
