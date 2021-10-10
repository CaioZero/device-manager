import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeviceManagerComponent} from "./views/device-manager/device-manager.component";
import {CategoryManagerComponent} from "./views/category-manager/category-manager.component";
import {HomeComponent} from "./views/home/home.component";

const routes: Routes = [
  {
    path: 'devices',
    component: DeviceManagerComponent,
    data : {actions : true}
  },
  {
    path: 'categories',
    component: CategoryManagerComponent,
    data : {actions : true}
  },
  {
    path: 'home',
    component: HomeComponent,
    data : {actions : false}
  },
  {
    path: '**',
    redirectTo:'home',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
