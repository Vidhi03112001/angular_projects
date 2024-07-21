import { Component } from '@angular/core';
import { Appointment } from '../model/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  //appointment is a property

  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];

  //ngOnInit is commonly used to call services
  ngOnInit(): void {
    let savedAppointments=localStorage.getItem("appointments");
    this.appointments =savedAppointments ? JSON.parse(savedAppointments) : [];
}

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
      };
      this.appointments.push(newAppointment);

      //Reset newApppointment title and date
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();

     //saved the updated appointment
      localStorage.setItem('appointments',JSON.stringify(this.appointments))

    }
  }

  deleteAppointment(index: number) {
    //he splice() method adds and/or removes array elements.
    this.appointments.splice(index, 1);
    localStorage.setItem('appointments',JSON.stringify(this.appointments))

  }
}
