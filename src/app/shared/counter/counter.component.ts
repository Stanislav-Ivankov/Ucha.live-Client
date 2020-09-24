import { Component, Input } from '@angular/core';

declare const TweenMax;
declare const TweenLite;
declare const Expo;
TweenLite.defaultEase = Expo.easeOut;

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})

export class CounterComponent {
  @Input('setTime') set setTime(value) {
    this.time = value;
  }

  @Input() waitingForFirst = false;
  @Input() noMoreToday = false;
  
  time = {
    min: '10',
    sec: '0'
  };

  timerEl;
  minutesGroup;
  secondsGroup;

  constructor() {
    setTimeout(() => {
      this.initTimer();
    }, 1000)
  }

  initTimer () {
    this.timerEl = document.querySelector('.timer');

    var minutesGroupEl = this.timerEl.querySelector('.minutes-group'),
        secondsGroupEl = this.timerEl.querySelector('.seconds-group');

    this.minutesGroup = {
      firstNum: minutesGroupEl.querySelector('.first'),
      secondNum: minutesGroupEl.querySelector('.second')
    },

    this.secondsGroup = {
      firstNum: secondsGroupEl.querySelector('.first'),
      secondNum: secondsGroupEl.querySelector('.second')
    };

    this.updateTimer();
  }

  updateTimer() {
    var timestr;
    var date = new Date();

    date.setHours(0);
    date.setMinutes(+this.time.min%60);
    date.setSeconds(+this.time.sec);

    var newDate = new Date(date.valueOf() - 1000);
    var temp = newDate.toTimeString().split(" ");
    var tempsplit = temp[0].split(':');

    this.time.min = tempsplit[1];
    this.time.sec = tempsplit[2];

    timestr = this.time.min  + this.time.sec;
    var timeNumbers = timestr.split('');
    this.updateTimerDisplay(timeNumbers);

    if(timestr === '0000')
      this.countdownFinished();

    if(timestr != '0000')
      setTimeout(() => this.updateTimer(), 1000);

  }

  updateTimerDisplay(arr) {

    this.animateNum(this.minutesGroup.firstNum, arr[0]);
    this.animateNum(this.minutesGroup.secondNum, arr[1]);
    this.animateNum(this.secondsGroup.firstNum, arr[2]);
    this.animateNum(this.secondsGroup.secondNum, arr[3]);

  }

  animateNum (group, arrayValue) {

    TweenMax.killTweensOf(group.querySelector('.number-grp-wrp'));
    TweenMax.to(group.querySelector('.number-grp-wrp'), 1, {
        y: - group.querySelector('.num-' + arrayValue).offsetTop
    });

  }

  countdownFinished() {
    setTimeout(function () {
        TweenMax.to(this.timerEl, 1, { opacity: 0.2 });
    }, 1000);
  }
}