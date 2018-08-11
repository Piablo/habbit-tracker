import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showFitness:boolean = true;
  showOther:boolean = false;
  display:boolean = false;

  toggleSidebar(){
    this.display = !this.display;
  }

  toggleView(selecteTab){
    if(selecteTab === 'other'){
      this.showFitness = false;
      this.showOther = true;
    }else if(selecteTab === 'fitness'){
      this.showFitness = true;
      this.showOther = false;
    }
  }

}
