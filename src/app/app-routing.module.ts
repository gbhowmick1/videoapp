import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {path:'', redirectTo:'/users',pathMatch:'full'},
  {path:'videos', component:VideoComponent},
  {path: 'users',component:UserComponent},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
