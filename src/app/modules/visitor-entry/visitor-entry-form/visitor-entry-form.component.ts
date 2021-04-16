import { VisitorEntryService } from 'src/app/services/visitor-entry.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-visitor-entry-form',
  templateUrl: './visitor-entry-form.component.html',
  styleUrls: ['./visitor-entry-form.component.scss']
})
export class VisitorEntryFormComponent implements OnInit {
  visitorEntryForm: FormGroup | undefined
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private visitorEntryService: VisitorEntryService
  ) { }

  ngOnInit(): void {
    this.builderForm()
    const user: any = this.authService.getUserInfo();

    this.vef!.userId.setValue(user.Id)
    this.vef!.nameUser.setValue(` ${user.FirstName} ${user.LastName}`)
  }

  registerVisitorEntry() {
    if (this.visitorEntryForm!.invalid) return

    this.loading = true
    this.visitorEntryService.create([this.visitorEntryForm!.value]).subscribe(
      res => {
        this.visitorEntryForm!.reset()
        this.toastrService.setSuccess(true)
        this.toastrService.setSuccess(undefined)
        this.loading = false
      }
    ),
    ((err: any) => {
      console.log(err)
      this.toastrService.setSuccess(undefined)
      this.loading = false
    })

  }

  builderForm() {
    this.visitorEntryForm = this.formBuilder.group({
      Agency: ['', Validators.required],
      Guide: ['', Validators.required],
      Locals: ['', Validators.required],
      Students: ['', Validators.required],
      Nationals: ['', Validators.required],
      Foreigns: ['', Validators.required],
      nameUser: [{ value: '', disabled: true }],
      userId: ['', Validators.required],
      CreatedAt: [new Date()],
    })
  }

  get vef() {
    return this.visitorEntryForm?.controls
  }
}
