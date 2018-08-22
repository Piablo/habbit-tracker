import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  
  constructor(private router: Router) { }
  
  ngOnInit() {
    this.tasks = [
      { vin: 'Record sleep data:', header: 'Vin' },
    ];
  }

  openSleep(){
    this.router.navigate(['dashboard/sleep']);
  }
  
  tasks: any[];
  
}
