import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import { MyTaskService } from 'src/app/shared/services/my-task.service';

@Component({
  selector: 'app-view-coverage',
  templateUrl: './view-coverage.component.html',
  styleUrls: ['./view-coverage.component.css']
})
export class ViewCoverageComponent  implements OnInit{
  statusCoverage: any = [];
  taskCoverage: any = [];

  constructor(
    public dialogRef: MatDialogRef<ViewCoverageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public taskService: MyTaskService
  ) { }

  ngOnInit() {
    if (this.data) {
      this.taskService.getTaskCoverage(this.data)
        .pipe(map(res => {
          if (res.Status == 200) {
            this.statusCoverage = res.data;
            for (var i in this.statusCoverage) {
              var count = this.statusCoverage[i];
              if (i == 'Not Started') {
                i = 'Not Accepted';
              }
              if (i == 'Pending') {
                i = 'Partial Complete';
              }
              this.taskCoverage.push({
                'Name': i,
                'Count': count
              });
            }
          }
        })).subscribe()
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
