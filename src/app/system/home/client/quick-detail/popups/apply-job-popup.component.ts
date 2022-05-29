import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MajorService } from 'src/app/core/model/major/major.service';
import {
  MajorCreateDto,
  UpdateMajorDto,
} from 'src/app/core/model/major/model/Major';

@Component({
  selector: 'app-apply-job-popup',
  templateUrl: './apply-job-popup.component.html',
  styleUrls: ['./apply-job-popup.component.scss'],
})
export class ApplyJobPopupComponent implements OnInit {
  headerTitle: string = '';
  headerData: any = {
    idJob: '',
    name: '',
  };
  employeeCreated = this.formBuilder.group({
    idJob: '',
    name: ['', Validators.required],
    description: ['', Validators.required],
    imageFile: ['', Validators.required],
  });
  constructor(
    public __dialog: MatDialog,
    private dialogRef: MatDialogRef<ApplyJobPopupComponent>,
    private formBuilder: FormBuilder,
    private majorService: MajorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.headerTitle = 'Apply job';
      this.headerData = {
        idJob: this.data.idJob,
        name: this.data.name,
      };
    }
    console.log('data on popup', this.data);
  }

  onSubmit(): void {
    if (this.data) {
      const MajorParams: any = {
        idJob: this.headerData.idJob,
        name: this.headerData.name,
        imageFile : this.file,
      };
      console.log('MajorParams', MajorParams);
      // this.majorService.RequestUpdateMajor(MajorParams).subscribe((res) => {
      //   console.log('update', res);
      //   this.dialogRef.close(true);
      // });
    }
  }

  onClose(): void {
    this.dialogRef.close(true);
  }
  file: any;
  filename: string;
  onFileSelected(evt: any) {
      this.file = evt.target.files[0];
      this.filename = this.file.name;
  }
}
