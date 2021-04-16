import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorEntryRoutingModule } from './visitor-entry-routing.module';
import { VisitorEntryFormComponent } from './visitor-entry-form/visitor-entry-form.component';


@NgModule({
  declarations: [VisitorEntryFormComponent],
  imports: [
    CommonModule,
    VisitorEntryRoutingModule,
    SharedModule
  ]
})
export class VisitorEntryModule { }
