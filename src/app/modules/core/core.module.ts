import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core/core.component';
import { HomeComponent } from './home/home.component';

import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [CoreComponent, HomeComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ClickOutsideModule
  ]
})
export class CoreModule { }
