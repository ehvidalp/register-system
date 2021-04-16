import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuvRoutingModule } from './ruv-routing.module';
import { RuvFormComponent } from './ruv-form/ruv-form.component';


@NgModule({
  declarations: [RuvFormComponent],
  imports: [
    CommonModule,
    RuvRoutingModule,
    SharedModule
  ]
})
export class RuvModule { }
