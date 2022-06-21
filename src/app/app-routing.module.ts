import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminNavComponent } from './components/nav/admin-nav/admin-nav.component';
import { ChatComponent } from './components/chat/chat.component'
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path : '', redirectTo : 'login', pathMatch : 'full'},
  { path : 'login', component : LoginComponent},
  { path : 'register', component : RegisterComponent},
  { path : 'adminNav', component : AdminNavComponent},
  { path : 'chat/:name', component : ChatComponent},
  { path : 'profile', component : ProfileComponent},
  { path : 'home', component : HomeComponent},
  { path : '**', component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
