import { VMUpdateRole, VMRole, VMCreateRole } from './../../../../core/model/roles/model/Roles';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { RolesService } from 'src/app/core/model/roles/Roles.service';

@Component({
  selector: 'app-role-create-popup',
  templateUrl: './role-create-popup.component.html',
  styleUrls: ['./role-create-popup.component.scss'],
})
export class RoleCreatePopupComponent implements OnInit {
  headerTitle: string = '';
  headerData: any = {
    id: '',
    name: '',
    description: '',
  };
  employeeCreated = this.formBuilder.group({
    id: '',
    name: ['', Validators.required],
    description: '',
  });
  constructor(
    public __dialog: MatDialog,
    private dialogRef: MatDialogRef<RoleCreatePopupComponent>,
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.headerTitle = 'Edit Role';
      this.headerData = {
        id: this.data.id,
        name : this.data.name,
        description: this.data.description,
      };
    } else {
      this.headerTitle = 'Add New Role';
      this.headerData = {
        id: '',
        name: '',
        description: '',
      };
    }
    console.log('data on popup', this.data);
  }

  onSubmit(): void {
    if (this.data) {
      const RoleParams: VMUpdateRole = {
          id : this.headerData.id,
          name: this.headerData.name,
          description: this.headerData.description,
      };
      this.rolesService.RequestUpdateRole(RoleParams).subscribe(res => {
          console.log(res);
          this.dialogRef.close(true);
      });
    } else {
      const RoleParams: VMCreateRole = {
          name: this.headerData.name,
          description: this.headerData.description,
      };
      this.rolesService.RequestCreateRole(RoleParams).subscribe(res => {
          console.log(res);
          this.dialogRef.close(true);
      });
    }
  }

  onClose(): void {
    this.dialogRef.close(true);
  }
}
