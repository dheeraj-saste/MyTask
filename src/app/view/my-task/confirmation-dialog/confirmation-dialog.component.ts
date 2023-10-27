import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
  viewLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef :MatDialogRef<ConfirmationDialogComponent>,
   
  ) {}
  ngOnInit(): void {
  console.log(this.data)
  }
  onNoClick() {
    this.matDialogRef.close()
  }
  onYesClick(): void {
		
		this.viewLoading = true;
		setTimeout(() => {
			this.matDialogRef.close(true); 
		}, 2500);
	}
}
