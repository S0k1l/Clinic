import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {

}
