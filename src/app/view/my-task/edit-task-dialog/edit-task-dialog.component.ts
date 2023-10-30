import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatDatepicker } from '@angular/material/datepicker';
import { MyTaskService } from 'src/app/shared/services/my-task.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css'],
})
export class EditTaskDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('datepicker') datepicker!: MatDatepicker<Date>;
  @ViewChild('datepicker1') datepicker1!: MatDatepicker<Date>;
  @ViewChild('tabGroup') tabGroup!: MatTabChangeEvent;

  leadList: any;
  editForm!: FormGroup;
  userDetails: any;
  usersSelected: any;
  tabChangeCount: number = 0;
  ccSelected: any;
  seletedTab: any = 0;
  sizeError:any
  previousSelected: any;
  userMembers: any;
  ccMembers: any;
  constructor(
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    private taskService: MyTaskService,
    private toastr: ToastrService
  ) {}
  currentDate: any = new Date();
  selectedDate: any = '';
  imageName: any = '';
  Title: any;
  imageExt: any;
  isActive: boolean = true;
  leadParams = {
    From: 1,
    To: -1,
    Text: '',
  };

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '');
    this.getLeadList();
    this.createForm();
    this.Title = this.editForm.controls['Title'];
  }
  createForm() {
    this.editForm = this.formBuilder.group({
      Id: [''],
      Title: ['', [  Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(20)]],

      Priority: ['',Validators.required],
      AssignedBy: [this.userDetails.UserId],
      AssignedToUserId: [''],
      AssignedDate: [''],
      CompletedDate: [''],
      Description: ['', Validators.required],
      IntercomGroupIds: [[]],
      IsActive: [this.isActive],
      Latitude: [''],
      Location: [''],
      Longitude: [''],
      Image: [''],
      MultimediaData: [''],
      MultimediaExtension: [''],
      MultimediaFileName: [''],
      MultimediaType: [''],
      TaskEndDateDisplay: ['', Validators.required],
      TaskEndDate: [''],
      TaskDisplayOwners: [''],
      TaskOwners: [''],
      TaskStatus: [''],
      UserDisplayIds: ['', Validators.required],
      UserIds: [''],
      LeadId: [''],
    });
  }

  tabChange(tab: any, event: MatTabChangeEvent) {


    let params = {
      title: 'Confirmation Dialog',
      description: 'Do you want to Change this Tab?',
      waitDescription: '',
      btnName: 'Ok',
    };

    const dialogref = this.dialog.open(ConfirmationDialogComponent, {
      data: params,
    });
    dialogref.afterClosed().subscribe((res) => {
    
      // if (!res) return;
      if (res == true) {
        this.seletedTab = event.index;
        this.tabChangeCount = 0;
      } else {
        // tab.seletedTab = this.seletedTab
        tab.selectedIndex = this.seletedTab;
        this.tabChangeCount++;
      
      }
    });
  }
  closeDatepicker() {
    if (this.seletedTab == 0) {
      this.datepicker.close();
    } else if (this.seletedTab == 1) {
      this.datepicker1.close();
    }
  }
  getLeadList() {
    this.taskService.getLeadList(this.leadParams).subscribe((res: any) => {});
  }
  addUser(control: string) {
    let actions;
    if (control == 'User') {
      actions = {
        userType: 'User',
        users: this.userMembers,
      };
    } else if (control == 'Owner') {
      actions = {
        userType: 'Owner',
        owner: this.ccMembers,
      };
    }

    const dialog = this.dialog.open(AddUserDialogComponent, {
      height: '89vh',
      width: '60vh',
      data: actions,
    });
    dialog.afterClosed().subscribe((res) => {
      if (!res) return;
      if (control == 'User') {
        this.userMembers = res;
        this.usersSelected = this.userMembers.length;
        this.editForm.controls['UserDisplayIds'].patchValue(
          this.usersSelected + ' Users'
        );
      } else if (control == 'Owner') {
        this.ccMembers = res;
        this.ccSelected = this.ccMembers.length;
        this.editForm.controls['TaskDisplayOwners'].patchValue(
          this.ccSelected + ' Users'
        );
      }
    });
  }
  openFiles() {
    this.fileInput.nativeElement.click();
  }

  handleFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      let size = this.bytesToMegaBytes(file.size);

      if (size <= 2) {
        this.sizeError = false;

        this.imageName = file.name;

        const reader = new FileReader();
        reader.onload = (e: any) => {
          const binaryData = e.target.result;
          const base64 = btoa(binaryData);
          this.editForm.patchValue({
            Image: base64,
            MultimediaData: base64,
          });
        };
        reader.readAsBinaryString(file);
      }
      else {
        this.sizeError = true;
      }
    }
  }

  bytesToMegaBytes(value: any) {
    let mb = value / 1024 / 1024;

    return mb;
  }
  patchValue() {
    let controls = this.editForm.controls;
    let ext = this.imageName.split('.').pop();
    let filename = this.imageName.split('.').shift();
    if (
      ext == 'jpeg' ||
      ext == 'JPEG' ||
      ext == 'jpg' ||
      ext == 'JPG' ||
      ext == 'png' ||
      ext == 'PNG' ||
      ext == 'svg' ||
      ext == 'SVG'
    ) {
      controls['MultimediaType'].patchValue('I');
    } else {
      if (this.imageExt) {
        controls['MultimediaType'].patchValue('D');
      } else {
        controls['MultimediaType'].patchValue('');
      }
    }

    controls['MultimediaExtension'].patchValue(ext);
    controls['MultimediaFileName'].patchValue(filename);
    if (this.seletedTab == 1) {
      const userid = [this.userDetails.UserId];

      controls['UserIds'].patchValue(userid);
    } else {
      const userIdArray = this.userMembers.map((obj: any) => obj.UserId);

      controls['UserIds'].patchValue(userIdArray);
    }

    if (this.ccMembers && this.ccMembers.length > 0) {
      controls['TaskOwners'].patchValue(this.ccMembers);
    } else {
      controls['TaskOwners'].patchValue([]);
    }

    let date = this.editForm.get('TaskEndDateDisplay')?.value;
    this.editForm.get('TaskEndDateDisplay')?.patchValue(date.toISOString());
    date = this.datepipe.transform(date, 'dd MMM yyyy hh:mm a');
    this.editForm.get('TaskEndDate')?.patchValue(date);
  }
  onSubmit() {
    ;
    if (this.seletedTab == 1) {
      this.editForm.controls['UserDisplayIds'].disable();
    }
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.patchValue();
    
    this.taskService.addTask(this.editForm.value).subscribe((res) => {
      if (res.Status == 200) {
        this.toastr.success(res.Message);

        this.dialogRef.close();
      } else if (res.Status !== 200) {
        this.toastr.error(res.Message);
      }
    });
  }
}
