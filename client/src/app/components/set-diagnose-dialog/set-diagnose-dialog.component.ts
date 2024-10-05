import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-set-diagnose-dialog',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatInputModule, 
    CommonModule,
    MatButtonModule,
    FormsModule  
  ],
  templateUrl: './set-diagnose-dialog.component.html',
  styleUrl: './set-diagnose-dialog.component.css'
})
export class SetDiagnoseDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SetDiagnoseDialogComponent>);
  readonly data = inject<string | null>(MAT_DIALOG_DATA);

  diagnose:string | null = this.data
  oldDiagnose:string | null = this.data

  onClear = ():void =>{
    this.diagnose = null;
  }

  onCancel = ():void =>{
    this.dialogRef.close(this.oldDiagnose);
  }

  onSubmit = (): void => {
    this.dialogRef.close(this.diagnose);
  }
}
