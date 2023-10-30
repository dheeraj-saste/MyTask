import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { MyTaskService } from 'src/app/shared/services/my-task.service';
import { PreviewImagedialogComponent } from '../preview-imagedialog/preview-imagedialog.component';

@Component({
  selector: 'app-task-info-dialog',
  templateUrl: './task-info-dialog.component.html',
  styleUrls: ['./task-info-dialog.component.css'],
})
export class TaskInfoDialogComponent implements OnInit {
  taskDetails: any;
  MultimediaLink: any;
  constructor(
    private taskService: MyTaskService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog:MatDialog
  ) {}
  ngOnInit(): void {
    this.taskService
      .getTaskDetails(this.data.taskId)
      .pipe(
        map((res) => {
          this.taskDetails = res.data;
          this.MultimediaLink = this.taskDetails.MultimediaName;
          let fileExt = this.taskService.getExtension(this.MultimediaLink);

          if (
            this.taskDetails.MultimediaName.slice(-2) != 'NA' &&
            (fileExt == 'pdf' ||
              fileExt == 'doc' ||
              fileExt == 'docx' ||
              fileExt == 'xls' ||
              fileExt == 'xlsx' ||
              fileExt == 'txt' ||
              fileExt == 'jpeg' ||
              fileExt == 'jpg' ||
              fileExt == 'png' ||
              fileExt == 'svg')
          ) {
            this.taskDetails.MultimediaName = this.taskService.getName(
              this.taskDetails.MultimediaName
            );
          } else {
            this.taskDetails.MultimediaName = '-';
          }
        })
      )
      .subscribe();
  }
  showPreviewImage(image: any) {
    const dialog = this.dialog.open(PreviewImagedialogComponent,{data:image})
    
  }
  showUser(taskId:any,userType:string) {
    
  }
}

