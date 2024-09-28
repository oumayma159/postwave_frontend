import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BoardUserComponent } from './pages/board-user/board-user.component';
import { httpInterceptorProviders } from './interceptors/http.interceptor';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { HeaderComponent } from './components/header/header.component';
//material angular configuration
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
//configuring the ToastrModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './pages/admin/admin.component';
import { UserPostComponent } from './pages/user-post/user-post.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UpdatePopupComponent } from './pages/update-popup/update-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardUserComponent,
    CreatePostComponent,
    HeaderComponent,
    AdminComponent,
    UserPostComponent,
    UpdatePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ToastrModule.forRoot()
  ],
  providers: [
    httpInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
