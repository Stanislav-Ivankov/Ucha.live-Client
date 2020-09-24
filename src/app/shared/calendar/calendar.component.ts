import { Component, Input } from '@angular/core';

// TODO: Add real ones
const events = [];
const containerHeight = 720;
const containerWidth = 320;
const minutesinDay = 60 * 12;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent {
  @Input() schedule = [];

  constructor() {
    // TODO: Do it properly
    setTimeout(() => {
      this.layOutDay(this.schedule);
      this.updateTimeline();
    }, 1000)

    setInterval(() => {
      this.updateTimeline();
    }, 60000)
  }

  // append one event to calendar
  createEvent(height, top, left, units, event) {
    let start = this.makeDate(event.start);
    let end = this.makeDate(event.end);
    let node = document.createElement("DIV");
    node.className = "event";
    node.innerHTML = 
    `<span class='title'>${start.getHours()}:${start.getMinutes() !== 0 ? start.getMinutes() : '00'} - ${end.getHours()}:${end.getMinutes() !== 0 ? end.getMinutes() : '00'} ${event.title}</span>
    <br><span class='location'>${event.description}</span>`;

    // Customized CSS to position each event
    node.style.width = (containerWidth/units) + "px";
    node.style.height = height + "px";
    node.style.top = top + "px";
    node.style.left = 100 + left + "px";

    document.getElementById("events").appendChild(node);
  }


  layOutDay(events) {
    // clear any existing nodes
    var myNode = document.getElementById("events");
    myNode.innerHTML = '';

    events.forEach((event, id) => {
      let start = (((this.makeDate(event.start).getHours() - 7 ) * 60) + this.makeDate(event.start).getMinutes()) * 0.88;
      let end = (((this.makeDate(event.end).getHours() - 7 ) * 60) + this.makeDate(event.end).getMinutes()) * 0.88;
      let height = (end - start) / minutesinDay * containerHeight;
      let top = start / minutesinDay * containerHeight; 
      this.createEvent(height, top, 10, 1, event);
    });
  }

	makeDate(hours) {
		let today = new Date();
		return new Date(`${today.getFullYear()}-${(today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1}-${(today.getDate() < 10 ) ? '0' + today.getDate() : today.getDate()}${hours}`);
	}

  updateTimeline() {
    let date = new Date();
    (document.getElementsByClassName('calendar-line')[0] as any).style.top = (((date.getHours() - 7 ) * 60) + date.getMinutes()) * 0.88;
  }
}