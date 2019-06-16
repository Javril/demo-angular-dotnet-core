import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ListsComponent } from './pages/lists/lists.component';
import { AuthGuard } from './guards/auth.guard';
import { MemberListComponent } from './pages/members/member-list/member-list.component';
import { MemberDetailComponent } from './pages/members/member-detail/member-detail.component';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberEditComponent } from './pages/members/member-edit/member-edit.component';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './resolvers/lists.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'members',
    component: MemberListComponent, canActivate: [AuthGuard],
    resolve: { users: MemberListResolver }
  },
  {
    path: 'members/:id',
    component: MemberDetailComponent, canActivate: [AuthGuard],
    resolve: { user: MemberDetailResolver }
  },
  {
    path: 'member/edit',
    component: MemberEditComponent,
    resolve: { user: MemberEditResolver },
    canDeactivate: [ PreventUnsavedChangesGuard ]
  },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  {
    path: 'lists',
    component: ListsComponent,
    resolve: { users: ListsResolver },
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
