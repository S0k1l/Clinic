import { CommonModule, Time } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

type TimeSpan = {
  start: string;
  end: string;
};

type GroupedTimeSpans = {
  time: string;
  timeSpan: TimeSpan[];
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'},
  ],
  imports: [MatCardModule, MatDatepickerModule, MatButtonModule, CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppointmentsComponent {
  selected!:Date;
  minDate!: Date;
  groupedTimeSpans!: GroupedTimeSpans[];

  timeSpans: TimeSpan[] = [
    { start: '09:00', end: '09:20' },
    { start: '09:20', end: '09:40' },
    { start: '09:40', end: '10:00' },
    { start: '10:00', end: '10:20' },
    { start: '10:20', end: '10:40' },
    { start: '10:40', end: '11:00' },
    { start: '11:00', end: '11:20' },
    { start: '11:20', end: '11:40' },
    { start: '11:40', end: '12:00' },
    { start: '12:00', end: '12:20' },
    { start: '12:20', end: '12:40' },
    { start: '12:40', end: '13:00' },
  ];

  constructor(){
    this.minDate = new Date();
    this.selected = this.minDate;
    this.groupedTimeSpans = this.groupTimeSpansByHour(this.timeSpans);
  }

  setTime(time: TimeSpan){
    const hours = time.start.split(':')[0]
    const minutes = time.start.split(':')[1]

    this.selected.setHours(+hours);
    this.selected.setMinutes(+minutes);

    console.log(this.selected);
  }

  groupTimeSpansByHour(timeSpans: TimeSpan[]): GroupedTimeSpans[] {
    const grouped: GroupedTimeSpans[] = [];
    let time: TimeSpan[] = [];
    const arrLenght: number = timeSpans.length;

    for (let index = 0; index < arrLenght; index++) {

      if(index == arrLenght - 1){
        time.push(timeSpans[index]);
        continue;
      }

      const startHour = timeSpans[index].start.split(':')[0];
      const nextStartHour = timeSpans[index + 1].start.split(':')[0];

      if(startHour == nextStartHour){
        time.push(timeSpans[index]);
      }
      else{
        time.push(timeSpans[index]);
        grouped.push({time: `${startHour}:00 - ${nextStartHour}:00`, timeSpan: time})
        time = [];
      }
    }

    return grouped;
  }
}
