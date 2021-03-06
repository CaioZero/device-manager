import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DeviceManagerComponent} from './views/device-manager/device-manager.component';
import {CategoryManagerComponent} from './views/category-manager/category-manager.component';
import {HomeComponent} from './views/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {AddCategoryComponent} from './views/category-manager/add-category/add-category.component';
import {RemoveCategoryComponent} from './views/category-manager/remove-category/remove-category.component';
import {AddDeviceComponent} from './views/device-manager/add-device/add-device.component';
import {RemoveDeviceComponent} from './views/device-manager/remove-device/remove-device.component';
import {MatSelectModule} from "@angular/material/select";
import {ToastrModule} from "ngx-toastr";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    DeviceManagerComponent,
    CategoryManagerComponent,
    HomeComponent,
    AddCategoryComponent,
    RemoveCategoryComponent,
    AddDeviceComponent,
    RemoveDeviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
