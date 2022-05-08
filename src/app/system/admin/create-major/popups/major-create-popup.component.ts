import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-major-create-popup',
  templateUrl: './major-create-popup.component.html',
  styleUrls: ['./major-create-popup.component.scss'],
})
export class MajorCreatePopupComponent implements OnInit {
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
    private dialogRef: MatDialogRef<MajorCreatePopupComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.headerTitle = 'Edit Major';
      this.headerData = {
        supplierName: this.data.supplierName,
        customerTypeName: this.data.customerTypeName,
        CountryTypeName: this.data.CountryTypeName,
        activeYn : this.data.activeYn,
        description: this.data.description,
      };
    } else {
      this.headerTitle = 'Add New Major';
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
      // const MajorParams: UpdateMajorDto = {
      //     id: this.headerData.id,
      //     cultureName: this.headerData.cultureName,
      //     uiCultureName: this.headerData.uiCultureName,
      //     displayName: this.headerData.displayName,
      //     flagIcon: this.headerData.flagIcon,
      //     isEnabled: true
      // };
      // this.MajorService.update(this.headerData.id, MajorParams).subscribe(res => {
      //     console.log(res);
      //     this.dialogRef.close(true);
      // });
    } else {
      // const MajorParams: CreateMajorDto = {
      //     cultureName: this.headerData.cultureName,
      //     uiCultureName: this.headerData.uiCultureName,
      //     displayName: this.headerData.displayName,
      //     flagIcon: this.headerData.flagIcon,
      //     isEnabled: true
      // };
      // this.MajorService.create(MajorParams).subscribe(res => {
      //     console.log(res);
      //     this.dialogRef.close(true);
      // });
    }
  }

  onClose(): void {
    this.dialogRef.close(true);
  }
}
