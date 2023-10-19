import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MyTaskService } from 'src/app/shared/services/my-task.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css'],
})
export class AddUserDialogComponent implements OnInit {
  userList: any;
  selectedUsers: any;
  constructor(private TaskService: MyTaskService) {}
  ngOnInit(): void {
    this.TaskService.getCompanyMembers(1, 100, '').subscribe((res) => {
      console.log(res);
      this.userList = res.data.Members;
    });
  }

  onChange(event: any, selectedUsers: any) {
    if (event.checked) {
      this.selectedUsers.push(selectedUsers);
    } else {
      // let remove = this.selectedUsers.filter(() => {});
    }

    const name = event;

    console.log(selectedUsers);
    console.log(name);
  }

  onSubmit() {}
}
