import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatDatepicker } from '@angular/material/datepicker';
import { MyTaskService } from 'src/app/shared/services/my-task.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css'],
})
export class EditTaskDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('datepicker') datepicker!: MatDatepicker<Date>;
  leadList: any;
  editForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private dialog: MatDialog,
    private taskService: MyTaskService
  ) {}
  currentDate: any = new Date();
  selectedDate: any = '';
  imageName: any = '';
  leadParams = {
    From: 1,
    To: -1,
    Text: '',
  };

  ngOnInit(): void {
    this.getLeadList();
    this.createForm();

    // this.editForm.get('date')?.valueChanges.subscribe((res) => {
    //   let date: any = new Date(res);
    //   if (res == '') {
    //     return;
    //   } else {
    //     this.selectedDate = this.datepipe.transform(date, 'dd MMM yyyy');
    //     console.log(res);
    //     console.log(this.selectedDate);

    //     // console.log(res);
    //   }
    // });
  }
  createForm() {
    this.editForm = this.formBuilder.group({
      Title: ['', Validators.pattern('^[a-zA-Z]{1,19}$')],
      Description: [''],
      Images: [''],
      CustomerName: [''],
      Date: [''],
      Priority: [''],
      Users: [''],
      ccMembers: [''],
    });
  }
  closeDatepicker() {
    this.datepicker.close();
  }
  getLeadList() {
    this.taskService.getLeadList(this.leadParams).subscribe((res: any) => {
      console.log(res);
    });
  }
  addUser() {
    const dialog = this.dialog.open(AddUserDialogComponent,{height:'89vh',width:'60vh'});
  }

  openFiles() {
    this.fileInput.nativeElement.click();
  }

  handleFileSelect(event: any) {
    const file: File = event.files[0];
    if (file) {
      console.log(file.size);
      let size = this.bytesToMegaBytes(file.size);
      console.log(size);

      if (size <= 2) {
        this.imageName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = reader.result as string;
          console.log('Base64 Encoded Image:', base64String);
          // You can use the base64String as needed, for example, sending it to a server.
        };
        reader.readAsDataURL(file);
      } else {
      }
    }
    console.log('Hello');
  }

  bytesToMegaBytes(value: any) {
    console.log(value, 'value');
    let mb = value / 1024 / 1024;
    console.log(mb, 'to mb');
    return mb;
  }
  onSubmit() {
    console.log(this.editForm.controls['Date'].value);
  }
}
