import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { Quester } from 'src/app/models/quester/quester.model';
import { Chat } from 'src/app/models/chat/chat.model';
import { Game } from 'src/app/models/game/game.model';
import { Genre } from 'src/app/models/genre/genre.model'
import { GameService } from 'src/app/services/game.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  constructor(
    private _auth : AuthService,
    private _chat : ChatService,
    private _game : GameService,
    private _genre : GenreService
  ) { }

  subAuth : Subscription
  isAdmin : boolean
  contactList : Quester[] = []
  chatList : Chat[] = []
  gameList : Game[] = []
  genreList : Genre[] = []

  ngOnInit(): void {
    this.subAuth = this._auth.isConnectedSubject.subscribe(() =>
      {
        this.isAdmin = localStorage.getItem('role') == 'admin' ? true : false
      })
    this._auth.emitIsConnected()

    this._chat.GetAllRooms().subscribe((data : Chat[]) => {return this.chatList = data})
    this._game.getAllFavoriteGames().subscribe((data : Game[]) => {return this.gameList = data})
    this._genre.getAllFavoriteGenres().subscribe((data : Genre[]) => {return this.genreList = data})
  }
}
