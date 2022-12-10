import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ContentDialogData{
  title: string;
  message: string;
}

@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.scss']
})
export class ContentDialogComponent {
  readonly BUTTON_TITLE = 'OK';

  constructor(@Inject(MAT_DIALOG_DATA) public data: ContentDialogData){
  }

}
