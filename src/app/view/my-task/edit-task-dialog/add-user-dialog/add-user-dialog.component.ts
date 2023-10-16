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
  baseUrl: any = environment.baseUrl;
  constructor(private TaskService: MyTaskService) {}
  ngOnInit(): void {
    this.TaskService.getCompanyMembers(1, 100).subscribe((res) =>
      console.log(res)
    );
  }
}
