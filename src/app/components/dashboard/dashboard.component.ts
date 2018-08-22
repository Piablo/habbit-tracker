import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(
    private router: Router) { }
    
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
    

    openCodeSnippits(){
      this.router.navigate(['dashboard/code-snippits']);
    }
  }
  