import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-imagedialog',
  templateUrl: './preview-imagedialog.component.html',
  styleUrls: ['./preview-imagedialog.component.css']
})
export class PreviewImagedialogComponent implements OnInit {

  dataImage:any
constructor(@Inject(MAT_DIALOG_DATA)public data:any){}
  ngOnInit(): void {
    
  }
}
