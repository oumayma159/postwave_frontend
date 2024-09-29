import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BoardUserComponent } from './pages/board-user/board-user.component';
import { AuthGuard } from './guards/auth.guard';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { userDetailsResolver } from './resolvers/user-details.resolver';
import { UserPostComponent } from './pages/user-post/user-post.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user', 
    component: BoardUserComponent, 
    resolve: {user : userDetailsResolver},
    canActivate: [AuthGuard]
  },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'userPosts', component: UserPostComponent , canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
