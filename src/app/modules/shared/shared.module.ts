import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrComponent } from './toastr/toastr.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ToastrComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ToastrComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
