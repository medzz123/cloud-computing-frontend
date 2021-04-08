import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [ListPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    CustomersRoutingModule,
    HttpClientModule,

  ],
})
export class CustomersModule {}
