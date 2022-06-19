import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game/game.model';
import { Genre } from 'src/app/models/genre/genre.model'


@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  @Input() gameList! : Game[]
  @Input() genreList! : Genre[]

  constructor() { }

  ngOnInit(): void {}

}
