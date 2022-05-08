import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-role-create-popup',
  templateUrl: './role-create-popup.component.html',
  styleUrls: ['./role-create-popup.component.scss'],
})
export class RoleCreatePopupComponent implements OnInit {
  headerTitle: string = '';
  headerData: any = {
    supplierName: '',
    customerTypeName: '',
    CountryTypeName: '',
    activeYn : false,
    description: '',
  };
  employeeCreated = this.formBuilder.group({
    supplierName: ['', Validators.required],
    customerTypeName: ['', Validators.required],
    CountryTypeName: ['', Validators.required],
    description: '',
    activeYn : false,
  });
  constructor(
    public __dialog: MatDialog,
    private dialogRef: MatDialogRef<RoleCreatePopupComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.headerTitle = 'Edit Role';
      this.headerData = {
        supplierName: this.data.supplierName,
        customerTypeName: this.data.customerTypeName,
        CountryTypeName: this.data.CountryTypeName,
        activeYn : this.data.activeYn,
        description: this.data.description,
      };
    } else {
      this.headerTitle = 'Add New Role';
      // this.headerData = {
      //   id: 0,
      //   cultureName: '',
      //   uiCultureName: '',
      //   displayName: '',
      //   flagIcon: '',
      //   isEnabled: true,
      // };
    }
    console.log('data on popup', this.data);
  }

  onSubmit(): void {
    if (this.data) {
      // const RoleParams: UpdateRoleDto = {
      //     id: this.headerData.id,
      //     cultureName: this.headerData.cultureName,
      //     uiCultureName: this.headerData.uiCultureName,
      //     displayName: this.headerData.displayName,
      //     flagIcon: this.headerData.flagIcon,
      //     isEnabled: true
      // };
      // this.RoleService.update(this.headerData.id, RoleParams).subscribe(res => {
      //     console.log(res);
      //     this.dialogRef.close(true);
      // });
    } else {
      // const RoleParams: CreateRoleDto = {
      //     cultureName: this.headerData.cultureName,
      //     uiCultureName: this.headerData.uiCultureName,
      //     displayName: this.headerData.displayName,
      //     flagIcon: this.headerData.flagIcon,
      //     isEnabled: true
      // };
      // this.RoleService.create(RoleParams).subscribe(res => {
      //     console.log(res);
      //     this.dialogRef.close(true);
      // });
    }
  }

  onClose(): void {
    this.dialogRef.close(true);
  }
}
