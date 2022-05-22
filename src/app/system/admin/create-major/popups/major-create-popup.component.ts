import {
  Major,
  MajorCreateDto,
  UpdateMajorDto,
} from './../../../../core/model/major/model/Major';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MajorService } from 'src/app/core/model/major/major.service';

@Component({
  selector: 'app-major-create-popup',
  templateUrl: './major-create-popup.component.html',
  styleUrls: ['./major-create-popup.component.scss'],
})
export class MajorCreatePopupComponent implements OnInit {
  headerTitle: string = '';
  headerData: any = {
    idMajor: '',
    name: '',
    description: '',
  };
  employeeCreated = this.formBuilder.group({
    idMajor: '',
    name: ['', Validators.required],
    description: '',
  });
  constructor(
    public __dialog: MatDialog,
    private dialogRef: MatDialogRef<MajorCreatePopupComponent>,
    private formBuilder: FormBuilder,
    private majorService: MajorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.headerTitle = 'Edit Major';
      this.headerData = {
        idMajor: this.data.idMajor,
        name: this.data.name,
        description: this.data.description,
      };
    } else {
      this.headerTitle = 'Add New Major';
      this.headerData = {
        idMajor: '',
        name: '',
        description: '',
      };
    }
    console.log('data on popup', this.data);
  }

  onSubmit(): void {
    if (this.data) {
      const MajorParams: UpdateMajorDto = {
        idMajor: this.headerData.idMajor,
        name: this.headerData.name,
        description: this.headerData.description,
      };
      this.majorService.RequestUpdateMajor(MajorParams).subscribe((res) => {
        console.log('update', res);
        this.dialogRef.close(true);
      });
    } else {
      const MajorParams: MajorCreateDto = {
        name: this.headerData.name,
        description: this.headerData.description,
      };
      this.majorService.RequestCreateMajor(MajorParams).subscribe((res) => {
        console.log('add', res);
        this.dialogRef.close(true);
      });
    }
  }

  onClose(): void {
    this.dialogRef.close(true);
  }
}
