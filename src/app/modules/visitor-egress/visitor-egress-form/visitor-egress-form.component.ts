import { ToastrService } from 'src/app/services/toastr.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-visitor-egress-form',
  templateUrl: './visitor-egress-form.component.html',
  styleUrls: ['./visitor-egress-form.component.scss']
})
export class VisitorEgressFormComponent implements OnInit {
  visitorEgressForm: FormGroup | undefined
  outGroupData = ['Nombre de la guia', 'Nombre de la otra guia']
  whereIsComingOutData = ['Volcan', 'Salida principal']

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.builderForm()
  }

  registerEgressVisitor(){
    if(this.visitorEgressForm!.invalid) return
    this.toastrService.setSuccess(false)
  }

  builderForm(){
    this.visitorEgressForm = this.formBuilder.group({
      outputGroup: ['', Validators.required],
      whereIsComingOut: ['', Validators.required]
    })
  }
}
