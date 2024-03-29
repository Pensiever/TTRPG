import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AccordionModule} from 'primeng/accordion';
import {SidebarModule} from 'primeng/sidebar';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {RippleModule} from 'primeng/ripple';
import {ChipModule} from 'primeng/chip';
import {PasswordModule} from 'primeng/password';
import {FilterService} from 'primeng/api';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {InputTextModule} from 'primeng/inputtext';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ColorPickerModule} from 'primeng/colorpicker';
import {PaginatorModule} from 'primeng/paginator';
import {OverlayPanelModule} from 'primeng/overlaypanel';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { TokenInterceptor } from './tools/token.interceptor';
import { NavComponent } from './components/nav/nav.component';
import { AdminNavComponent } from './components/nav/admin-nav/admin-nav.component';
import { ChatComponent } from './components/chat/chat.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    AdminNavComponent,
    ChatComponent,
    PageNotFoundComponent,
    ProfileComponent,
    HomeComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    SidebarModule,
    MenubarModule,
    CardModule,
    DividerModule,
    RippleModule,
    ChipModule,
    PasswordModule,
    ScrollPanelModule,
    InputTextModule,
    VirtualScrollerModule,
    ToolbarModule,
    ButtonModule,
    CalendarModule,
    ToastModule,
    ColorPickerModule,
    PaginatorModule,
    OverlayPanelModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    MessageService,
    FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
