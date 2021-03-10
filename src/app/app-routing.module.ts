import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventComponent } from './event/event.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './service/auth-guard.service';
import { InviteReplyComponent } from './invite-reply/invite-reply.component';

const routes: Routes = [
  
  { path: "login",
   component: LoginComponent,
  },

  { path: "",
   redirectTo: "login",
   pathMatch: "full" ,
  },
  

  { path: "home", 
  component: HomeComponent, 
  canActivate:[AuthGuard] 
  },
  { path: "login",
   component: LoginComponent,
   canActivate:[AuthGuard] 
  },
  { path: "register",
   component: RegisterComponent,
   canActivate:[AuthGuard] 
  },
  { path: "event",
   component: EventComponent,
   canActivate:[AuthGuard] 
  },
  { path: "invite-reply",
  component: InviteReplyComponent,
  // canActivate:[AuthGuard] 
 },

  { path: "page-not-found",
   component: PageNotFoundComponent,
  },
  { path: "**",
   redirectTo: "page-not-found",
   pathMatch: "full" ,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
