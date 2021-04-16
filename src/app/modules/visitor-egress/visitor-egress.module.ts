import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorEgressRoutingModule } from './visitor-egress-routing.module';
import { VisitorEgressFormComponent } from './visitor-egress-form/visitor-egress-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [VisitorEgressFormComponent],
  imports: [
    CommonModule,
    VisitorEgressRoutingModule,
    SharedModule
  ]
})
export class VisitorEgressModule { }
