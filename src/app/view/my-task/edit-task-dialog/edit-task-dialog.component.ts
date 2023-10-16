import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from 'src/app/core/pipes/date.pipe';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css'],
})
export class EditTaskDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  editForm!: FormGroup;
  constructor(private formBuilder: FormBuilder ,private datepipe:DatePipe,private dialog :MatDialog) {}
  currentDate: any = new Date();
  imageName: any = '';

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      title: ['', Validators.pattern('^[a-zA-Z]{1,19}$')],
      description: [''],
      Images: [''],
      customerName: [''],
      date: [''],
      priority: [''],
      users: [''],
      ccMembers: [''],
    });

    this.editForm.get('date')?.valueChanges.subscribe((res) => {
      
      if (res = '') {
        return; 
        
      } else {
        
        let date = this.datepipe.transform(res, 'dd/MMM/yyyy')
        console.log(date);
        
        this.editForm.get('date')?.patchValue(date);
        console.log(res);
      }
        
        
    });
  }
  addUser() {

    const dialog = this.dialog.open(AddUserDialogComponent);
    
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
}
