import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  
  constructor() { }
  
  calculateSleepHours(sleepTimes){
    var value;
    
    var lastAwakeTime = sleepTimes.stillAwake;
    var awakeTime = sleepTimes.outOfBed; 
    
    var sleepDateTime = lastAwakeTime.split(" ");
    var sleepDateStrings = sleepDateTime[0].split("-");
    var sleepTimeStrings = sleepDateTime[1].split(":");
    
    var wakeDateTime = awakeTime.split(" ");
    var wakeDateStrings = wakeDateTime[0].split("-");
    var wakeTimeStrings = wakeDateTime[1].split(":");
    
    var sleepYear:number = parseInt(sleepDateStrings[0]);
    var wakeYear:number = parseInt(wakeDateStrings[0]);
    
    var sleepMonth:number = parseInt(sleepDateStrings[1]);
    var wakeMonth:number = parseInt(wakeDateStrings[1]);
    
    var sleepDay:number = parseInt(sleepDateStrings[2]);
    var wakeDay:number = parseInt(wakeDateStrings[2]);
    
    var sleepHour:number = parseInt(sleepTimeStrings[0]);
    var sleepMin:number = parseInt(sleepTimeStrings[1]);
    var sleepSecond:number = parseInt(sleepTimeStrings[2]);
    
    var wakeHour:number = parseInt(wakeTimeStrings[0]);
    var wakeMin:number = parseInt(wakeTimeStrings[1]);
    var wakeSecond:number = parseInt(wakeTimeStrings[2]);
    
    if(sleepDay !== wakeDay){
      var timeTill12 = this.timeTill12(wakeDay - sleepDay, sleepHour, sleepMin, sleepSecond);
      value = this.hoursOfSleep(timeTill12, wakeHour, wakeMin, wakeSecond);
    }else{
      value = this.hoursOfSameDaySleep(wakeSecond, sleepSecond, wakeMin, sleepMin, wakeHour, sleepHour);
    }
    return value;
  }

  hoursOfSameDaySleep(wakeSecond, sleepSecond, wakeMin, sleepMin, wakeHour, sleepHour){
    var seconds = wakeSecond - sleepSecond;
    var minutes = wakeMin - sleepMin;
    var hours = wakeHour - sleepHour;

    if(seconds < 0){
      seconds = 60 + seconds;
      minutes = minutes - 1;
    }
    if(minutes < 0){
      minutes = 60 + minutes;
      hours = hours - 1;
    }
    var value = this.sanitizeString(hours, minutes, seconds);
    return value;
  }
  
  hoursOfSleep(timeTill12, wakeHour, wakeMin, wakeSecond){
    var hours = timeTill12.hours + wakeHour;
    var mins = timeTill12.mins + wakeMin;
    var seconds = timeTill12.seconds + wakeSecond;
    if(seconds >= 60){
      mins = mins + 1;
      seconds = seconds - 60;
    }
    if(mins >= 60){
      hours = hours + 1;
      mins = mins - 60;
    }
    
    var value = this.sanitizeString(hours, mins, seconds);
    return value;
  }

  sanitizeString(hours, mins, seconds){
    var value:string;
    var singleDigit = mins.toString().length;
    if(singleDigit === 1){
      mins = "0" + mins.toString();
    }
    singleDigit = seconds.toString().length;
    if(singleDigit === 1){
      seconds = "0" + seconds.toString();
    }
    return value = hours + ":" + mins + ":" + seconds;

  }
  
  timeTill12(differenceInDays, sleepHour, sleepMin, sleepSecond){
    var hoursTill12 = 0;
    var minsTill12 = 0;
    var secondsTill12 = 0;
    if(differenceInDays === 1){
      hoursTill12 = 24 - sleepHour;
      if(sleepMin !== 0){
        hoursTill12 = hoursTill12 - 1;
        minsTill12 = 60 - sleepMin;
        
        if(sleepSecond !== 0){
          minsTill12 = minsTill12 - 1;
          secondsTill12 = 60 - sleepSecond;
        }
      }else{
        if(sleepSecond !== 0){
          minsTill12 - 1;
          secondsTill12 = 60 - sleepSecond;
        }
      }
    }else{
      console.log('There is no code available to calulate more than 24 hours of sleep...');
    }
    var value = {
      hours: hoursTill12,
      mins: minsTill12,
      seconds: secondsTill12
    }
    return value;
  }
}
