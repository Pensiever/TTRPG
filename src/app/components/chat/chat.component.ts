import { ChatService, Message } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message! : string
  roomName! : string
  sender! : string
  messageList : Message[] = []
  constructor(
    private _chat : ChatService,
    private _route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    let roomName = this._route.snapshot.params['name']
    this._chat.messageListSubject.subscribe({
      next : (data : Message[]) => this.messageList = data
    })
    this._chat.emitMessageList()
    this._chat.connecting()
    this._chat.JoinRoom(roomName)
  }

  SendMessage() {
    this._chat.SendMessage(this.message, localStorage.getItem("room"))
    this.message = ''
  }

  LeaveRoom() {
    this._chat.LeaveRoom(localStorage.getItem("room"))
    this.message = ''
  }
}
