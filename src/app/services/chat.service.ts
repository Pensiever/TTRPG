import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import * as signalr from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  myhub! : signalr.HubConnection
  private baseAdress = environment.baseUrl;
  messageList : Message[] = []
  messageListSubject : Subject<Message[]> = new Subject<Message[]>()

  emitMessageList() {
    this.messageListSubject.next(this.messageList)
  }

  constructor(
    private _client : HttpClient,
    private _router : Router
  ) { }

  connecting() {
    this.myhub = new signalr.HubConnectionBuilder().withUrl(this.baseAdress + "chat").build()

    this.myhub.start()
    .then(() => {
      console.log('connexion au chat établie')
    })
    .catch((error) => console.log('Connexion échouée : ' + error))
  }

  GetAllRooms() : Observable<Room[]> {
    return this._client.get<Room[]>(this.baseAdress+"/Chat")
  }

  JoinRoom(roomName : string): void {

    this.myhub.on("History", (data : Message[]) => {
      this.messageList = data
      this.emitMessageList()
    })
    this.myhub.on("Sent", (message : Message) => {
      this.messageList.push(message)
      this.emitMessageList()
    })
    this.myhub.send("AddToRoom", roomName)
    localStorage.setItem("room", roomName)
  }

  LeaveRoom(roomName : string) {
    this.myhub.on("Send", (message : Message) => {
      this.messageList.push(message)
      this.emitMessageList()
    })
    this.myhub.send("RemoveFromRoom", roomName)
    localStorage.removeItem("room")
    this._router.navigate(['/home'])
  }

  SendMessage(newmessage : string, roomName : string) {
    this.myhub.on("messageSending", (message : Message) => {
      this.messageList.push(message)
      this.emitMessageList()
    })
    this.myhub.send("SendMessage", newmessage, roomName)
  }
}

export interface Message {
  room : string
  sender : string
  content : string
}

export interface Room {
  roomName : string
}
