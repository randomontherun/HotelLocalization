import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpResponse,HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import {resourceChangeTicket} from "@angular/compiler-cli/src/ngtsc/core";





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private httpClient:HttpClient){}

  private baseURL:string='http://localhost:8080';

  private getUrl:string = this.baseURL + '/room/reservation/v1/';
  private postUrl:string = this.baseURL + '/room/reservation/v1';
  public submitted!:boolean;
  roomsearch! : FormGroup;
  rooms! : Room[];
  request!:ReserveRoomRequest;
  currentCheckInVal!:string;
  currentCheckOutVal!:string;
  welcomeMessages: string[] = [];
  presentationMessage: string = '';

  fetchWelcomeMessages() {
    this.httpClient.get<string[]>('http://localhost:8080/welcome')
      .pipe(
        catchError(error => {
          console.error('Error fetching welcome messages:', error);
          return throwError(error); // Rethrow the error
        })
      )
      .subscribe(response => {
        this.welcomeMessages = response;
      });
  }

  fetchPresentationDetails(): void {
    this.httpClient.get('http://localhost:8080/presentation', { responseType: 'text' })
      .subscribe(response => {
        this.presentationMessage = response;
      });
  }

    ngOnInit(){
      this.fetchPresentationDetails();
      this.fetchWelcomeMessages();

      this.roomsearch= new FormGroup({
        checkin: new FormControl(' '),
        checkout: new FormControl(' ')
      });

 //     this.rooms=ROOMS;


    const roomsearchValueChanges$ = this.roomsearch.valueChanges;

    // subscribe to the stream
    roomsearchValueChanges$.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });
  }

  onSubmit({value, valid}: {value: Roomsearch, valid: boolean}) {
    this.getAll().subscribe(
      rooms => {
        this.rooms = <Room[]>Object.values(rooms)[0];
        this.rooms.forEach(room => {
          // Perform crude conversion for CAD and EUR
          // Assuming a simple conversion rate for demonstration purposes
          room.priceCAD = (parseFloat(room.price) * 1.25).toFixed(2); // Convert to CAD
          room.priceEUR = (parseFloat(room.price) * 0.88).toFixed(2); // Convert to EUR
        });
      }
    );
  }
    reserveRoom(value:string){
      this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);

      this.createReservation(this.request);
    }
    createReservation(body:ReserveRoomRequest) {
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
     // let options = new RequestOptions({headers: headers}); // Create a request option

     const options = {
      headers: new HttpHeaders().append('key', 'value'),

    }

      this.httpClient.post(this.postUrl, body, options)
        .subscribe(res => console.log(res));
    }

  /*mapRoom(response:HttpResponse<any>): Room[]{
    return response.body;
  }*/

    getAll(): Observable<any> {


       return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin='+ this.currentCheckInVal + '&checkout='+this.currentCheckOutVal, {responseType: 'json'});
    }

  }



export interface Roomsearch{
    checkin:string;
    checkout:string;
  }




export interface Room{
  id:string;
  roomNumber:string;
  price:string;
  links:string;
  priceCAD?: string; // Add priceCAD variable
  priceEUR?: string; // Add priceEUR variable

}
export class ReserveRoomRequest {
  roomId:string;
  checkin:string;
  checkout:string;

  constructor(roomId:string,
              checkin:string,
              checkout:string) {

    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}

/*
var ROOMS: Room[]=[
  {
  "id": "13932123",
  "roomNumber" : "409",
  "price" :"20",
  "links" : ""
},
{
  "id": "139324444",
  "roomNumber" : "509",
  "price" :"30",
  "links" : ""
},
{
  "id": "139324888",
  "roomNumber" : "609",
  "price" :"40",
  "links" : ""
}
] */

