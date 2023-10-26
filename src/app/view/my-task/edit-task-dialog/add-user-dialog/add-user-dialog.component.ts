import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MyTaskService } from 'src/app/shared/services/my-task.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css'],
})
export class AddUserDialogComponent implements OnInit {
  userList: any;
  usersSelected: any[] = [];
  ownersSelected: any[] = [];
  totalRecords: any;
  userType: any;
  usersChecked: any[] = [];
  ownersChecked: any[] = [];
  noRecords: boolean = false;

  constructor(
    private TaskService: MyTaskService,
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.userType = this.data?.userType;

    if (this.userType == 'User') {
      this.usersChecked = this.data?.users;
    } else if (this.userType == 'Owner') {
      this.ownersChecked = this.data?.owner;
    }

    this.getMembers(1, 1000, '');
  }
  getMembers(from: any, to: any, text: any) {
    this.TaskService.getCompanyMembers(from, to, text).subscribe((res) => {
      this.userList = res.data.Members;
      this.totalRecords = res.data.TotalRecords;
      if (this.usersChecked && this.usersChecked.length > 0) {
        this.usersSelected = this.usersChecked;
        for (const checkedItem of this.usersChecked) {
          const matchingUser = this.userList.find(
            (user: any) => user.UserId === checkedItem.UserId
          );
          if (matchingUser) {
            Object.assign(matchingUser, checkedItem);
          }
        }
      } else if (this.ownersChecked && this.ownersChecked.length>0) {
        this.ownersSelected = this.ownersChecked;
        for (const checkedItem of this.ownersChecked) {
          const matchingUser = this.userList.find(
            (user: any) => user.UserId === checkedItem.UserId
          );
          if (matchingUser) {
            Object.assign(matchingUser, checkedItem);
          }
        } 
      }

      if (this.userList == undefined) {
        this.noRecords = true;
      } else {
        this.noRecords = false;
      }
    });
  }

  onChange(event: any, selectedUser: any) {
    if (event.checked) {
      if (this.userType == 'User') {
        selectedUser['checked'] = true;
        this.usersSelected.push(selectedUser);
      } else if (this.userType == 'Owner') {
        selectedUser['checked'] = true;
        this.ownersSelected.push(selectedUser);
      }
    } else if (!event.checked) {
      if (this.userType == 'User') {
        let index = this.usersSelected.findIndex(
          (x) => x.UserId == selectedUser.UserId
        );

        this.usersSelected.splice(index, 1);
      }
    } else if (this.userType == 'Owner') {
      let index = this.ownersSelected.findIndex(
        (x) => x.UserId == selectedUser.UserId
      );

      this.ownersSelected.splice(index, 1);
    }
  }

  onSearch(event: any) {
    let text = event.target.value as HTMLInputElement;
    this.getMembers(1, this.totalRecords, text);
  }
  closeDialog() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.userType == 'User') {
      
      this.dialogRef.close(this.usersSelected);
    } else if (this.userType == 'Owner') {
      
      this.dialogRef.close(this.ownersSelected);
    }


  }
}
