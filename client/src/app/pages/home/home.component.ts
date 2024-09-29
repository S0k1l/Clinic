import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatSelectModule, MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selected = 'all';

  doctors = new Array(10).fill({
    name: 'Прізвище І\'мя по Батькові',
    title: 'Сімейний лікар',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Valeriy_Konovalyuk_3x4.jpg'
  });
}
