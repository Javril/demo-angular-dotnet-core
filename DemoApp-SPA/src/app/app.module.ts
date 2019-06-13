import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './redux/counter/counter.reducer';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
// import { TimeagoModule } from 'ngx-timeago';
import { TimeagoModule, TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter } from 'ngx-timeago';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorInterceptorProvider } from './services/auth/error.interceptor';
import { DropdownDirective } from './shared/dropdown/dropdown.directive';
import { CountersComponent } from './counters/counters.component';
import { CollapseDirective } from './shared/collapse/collapse.directive';
import { MembersComponent } from './pages/members/members.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ListsComponent } from './pages/lists/lists.component';
import { MemberListComponent } from './pages/members/member-list/member-list.component';
import { MemberCardComponent } from './pages/members/member-card/member-card.component';
import { MemberDetailComponent } from './pages/members/member-detail/member-detail.component';
import { TabsComponent } from './core/tabs/tabs.component';
import { DynamicTabsComponent } from './core/dynamic-tabs/dynamic-tabs.component';
import { MemberEditComponent } from './pages/members/member-edit/member-edit.component';
import { PhotoEditorComponent } from './pages/members/member-edit/photo-editor/photo-editor.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export class MyIntl extends TimeagoIntl {
  // do extra stuff here...
}


@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CountersComponent,
    DropdownDirective,
    CollapseDirective,
    MembersComponent,
    MessagesComponent,
    ListsComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    TabsComponent,
    DynamicTabsComponent,
    MemberEditComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxGalleryModule,
    FileUploadModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl, useClass: MyIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    }),
    StoreModule.forRoot({ count: counterReducer }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
