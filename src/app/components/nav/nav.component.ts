import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { Quester } from 'src/app/models/quester/quester.model';
import { Chat } from 'src/app/models/chat/chat.model';
import { Game } from 'src/app/models/game/game.model';
import { Genre } from 'src/app/models/genre/genre.model'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  subAuth : Subscription
  isAdmin : boolean
  contactList : Quester[] = []
  chatList : Chat[] = []
  gameList : Game[] = []
  genreList : Genre[] = []

  constructor(
    private _auth : AuthService,
    private _chat : ChatService
  ) { }

  ngOnInit(): void {
    this.subAuth = this._auth.isConnectedSubject.subscribe(() =>
      {
        this.isAdmin = localStorage.getItem('role') == 'admin' ? true : false
      })
    this._auth.emitIsConnected()

    this._chat.GetAllRooms().subscribe((data : Chat[]) => this.chatList = data)
  }
}
