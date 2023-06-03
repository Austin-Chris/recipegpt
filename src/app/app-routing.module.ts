import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatAreaComponentComponent } from './chat-area-component/chat-area-component.component';
import { AuthComponent } from './auth/login/auth.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {
    path: "",
    component: AuthComponent
  },

  {
    path: 'findRecipe',
    component: ChatAreaComponentComponent
  },

  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


