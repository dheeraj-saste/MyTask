import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { MyTaskService } from 'src/app/shared/services/my-task.service';

@Component({
  selector: 'app-partial-complete-dialog',
  templateUrl: './partial-complete-dialog.component.html',
  styleUrls: ['./partial-complete-dialog.component.css']
})
export class PartialCompleteDialogComponent implements OnInit {

  partialCompletePercent: any = [];
  partialValue: number = 0;
  isChanged: boolean = false;
  selectedValue: number = 0;
  viewLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PartialCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public taskService: MyTaskService
  ) { }

  ngOnInit() {    
    this.partialValue = this.data.TaskStatusValue;
    this.taskService.getPartialCompleteStatus()
      .pipe(map((res:any) => {
        if (res.Status == 200) {
          this.partialCompletePercent = res.data
        }
      })).subscribe()
  }

  taskValue(valuePercent: number) {
    this.partialValue = valuePercent;
    this.selectedValue = valuePercent;
    this.isChanged = true;
  }

  onSubmit() {
    this.viewLoading = true;
    this.taskService.partialCompleteTask(this.data.TaskId, this.partialValue)
      .pipe(map((res:any) => {
        if (res.Status == 200) {
          this.dialogRef.close({ res, isEdit: true })
        }
        this.viewLoading = false;
      })).subscribe();
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
