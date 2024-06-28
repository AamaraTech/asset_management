import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'sanadi-dialog-footer',
  standalone: true,
  imports: [ButtonModule, TranslateModule, JsonPipe],
  templateUrl: './dialog-footer.component.html',
  styleUrl: './dialog-footer.component.scss'
})
export class DialogFooterComponent{

  tabIndex = 0;

  dialogRef = inject(DynamicDialogRef)
  dialogConfig = inject(DynamicDialogConfig)
  onSubmit(){
    this.dialogRef.close(this.dialogConfig.data.item)
    console.log(this.dialogConfig.data);
  }

  nextTab(){
    dispatchEvent(new CustomEvent("nextTabChange"));
  }

  previousTab(){
    dispatchEvent(new CustomEvent("prevTabChange"));
  }

}
