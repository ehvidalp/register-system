import { RuvService } from 'src/app/services/ruv.service';
import { AuthService } from 'src/app/services/auth.service';
import { RuvArrays } from 'src/app/models/ruv-arrays';
import { ToastrService } from 'src/app/services/toastr.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ruv-form',
  templateUrl: './ruv-form.component.html',
  styleUrls: ['./ruv-form.component.scss'],
})
export class RuvFormComponent implements OnInit {
  ruvForm: FormGroup | undefined;
  loading = false;
  genderData = ['Femenino', 'Masculino'];
  nationalityData = ['Guatemalteca', 'Otro/Other'];
  countryResidenceData = [
    'Guatemala',
    'Estados Unidos/USA',
    'Reino Unido/UK',
    'Australia',
    'Israel',
    'Otro/Other',
  ];
  departmentData = [
    'Guatemala',
    'Sacatepéquez',
    'Alta Verapaz',
    'Baja Verapaz',
    'Chimaltenango',
    'Chiquimula',
    'Petén',
    'El Progreso',
    'Quiché',
    'Escuintla',
    'Huehuetenango',
    'Izabal',
    'Jalapa',
    'Jutiapa',
    'Quetzaltenango',
    'Retalhuleu',
    'San Marcos',
    'Santa Rosa',
    'Sololá',
    'Suchitepéquez',
    'Totonicapán',
    'Zacapa',
  ];
  reasonVisitData = [
    'Naturaleza / Nature',
    'Recreación / Recreation',
    'Cultura Viva / Living Culture',
    'Arqueología / Archaeology',
    'Aventura / Adventure',
    'Investigación / Research',
    'Otro / Other',
  ];
  howDidYouFindData = [
    'Recomendación / Recommendation',
    'Agencia de viajes / Travel Agency',
    'Guía Impresa de Viajes / Printed Travel Guides',
    'Trifoliares / Bronchures',
    'Intenert',
    'Tv, Radio, Prensa / Tv, Radio, Newspaper',
    'Otro / Other',
  ];
  activitiesToDo: RuvArrays[] = [];
  activitiesFormControl = ['trecking', 'canopy', 'birdwatching', 'learnTheHistoryOfTheSite', 'bikeRiding', 'camping', 'religionActivity', 'otherActivity'];
  travelingWith: RuvArrays[] = [];
  travelingWithFormControl = ['byYourself', 'family', 'friends', 'school', 'university', 'travelAgency', 'otherTravelingWith'];
  yesOrNot = [
    { name: 'Si / Yes', value: true },
    { name: 'No', value: false }
  ];
  activities: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private ruvService: RuvService
  ) { }

  ngOnInit(): void {
    this.builderForm();
    this.otherDescriptionForm();
    this.getInfoLocalStorage();
  }

  registerVisitor() {
    if (this.ruvForm!.invalid) return;

    this.loading = true;
    const nationality: string = (this.rf!.Nationality.value === 'Otro/Other') ? this.rf!.otherNationality.value : this.rf!.Nationality.value
    const residence: string = (this.rf!.Residence.value === 'Otro/Other') ? this.rf!.otherCountryOfResidence.value : this.rf!.Residence.value
    const findOut: string = (this.rf!.FindOut.value === 'Otro / Other') ? this.rf!.otherFindOut.value : this.rf!.FindOut.value
    let activities: RuvArrays[] = []
    let companions: RuvArrays[] = []

    this.rf!.Nationality.setValue(nationality)
    this.rf!.Residence.setValue(residence)
    this.rf!.FindOut.setValue(findOut)

    for (let index in this.activitiesToDo) {
      if (this.ruvForm!.get(this.activitiesToDo[index].formControl!)!.value) activities!.push(this.activitiesToDo[index])
    }

    for (let index in this.travelingWith) {
      if (this.ruvForm!.get(this.travelingWith[index].formControl!)!.value) companions!.push(this.travelingWith[index])
    }

    this.rf!.Activities.setValue(activities)
    this.rf!.Companions.setValue(companions)

    this.ruvService.create([this.ruvForm!.value], this.rf!.Activities.value, this.rf!.Companions.value).subscribe(res => {
      this.ruvForm!.reset()
      this.toastrService.setSuccess(true);
      this.toastrService.setSuccess(undefined);
      this.loading = false
    }),
      ((err: any) => {
        console.log(err)
        this.toastrService.setSuccess(false);
        this.toastrService.setSuccess(undefined);
        this.loading = false
      })
  }

  travelingCheckbox() {
    let isChecked = false;

    for (let index in this.travelingWith) {
      if (this.ruvForm?.get(this.travelingWith[index].formControl!)!.value) {
        isChecked = true;
        break;
      } else isChecked = false;
    }

    if (isChecked) {
      for (let index in this.travelingWith) {
        this.ruvForm
          ?.get(this.travelingWith[index].formControl!)!
          .setValidators(null);
        this.ruvForm
          ?.get(this.travelingWith[index].formControl!)!
          .updateValueAndValidity();
      }
    } else {
      for (let index in this.travelingWith) {
        this.ruvForm
          ?.get(this.travelingWith[index].formControl!)!
          .setValidators([Validators.required]);
        this.ruvForm
          ?.get(this.travelingWith[index].formControl!)!
          .updateValueAndValidity();
      }
    }
  }

  activitiesCheckbox() {
    let isChecked = false;

    for (let index in this.activitiesToDo) {
      if (this.ruvForm?.get(this.activitiesToDo[index].formControl!)!.value) {
        isChecked = true;
        break;
      } else isChecked = false;
    }

    if (isChecked) {
      for (let index in this.activitiesToDo) {
        this.ruvForm
          ?.get(this.activitiesToDo[index].formControl!)!
          .setValidators(null);
        this.ruvForm
          ?.get(this.activitiesToDo[index].formControl!)!
          .updateValueAndValidity();
      }
    } else {
      for (let index in this.activitiesToDo) {
        this.ruvForm
          ?.get(this.activitiesToDo[index].formControl!)!
          .setValidators([Validators.required]);
        this.ruvForm
          ?.get(this.activitiesToDo[index].formControl!)!
          .updateValueAndValidity();
      }
    }
  }

  enableMunicipaliy() {
    this.rf!.Municipality.enable();
  }

  otherDescriptionForm() {
    this.rf!.Nationality.valueChanges.subscribe((value) => {
      if (value === 'Otro/Other') {
        this.rf!.otherNationality.enable();
        this.rf!.otherNationality.setValidators([Validators.required]);
      } else {
        this.rf!.otherNationality.disable();
        this.rf!.otherNationality.setValidators(null);
      }
      this.rf!.otherNationality.updateValueAndValidity();
    });

    this.rf!.Residence.valueChanges.subscribe((value) => {
      if (value === 'Otro/Other') {
        this.rf!.otherCountryOfResidence.enable();
        this.rf!.otherCountryOfResidence.setValidators([Validators.required]);
      } else {
        this.rf!.otherCountryOfResidence.disable();
        this.rf!.otherCountryOfResidence.setValidators(null);
      }
      this.rf!.otherCountryOfResidence.updateValueAndValidity();
    });

    this.rf!.otherActivity.valueChanges.subscribe((value) => {
      if (value) {
        this.rf!.ActivityExplanation.enable();
        this.rf!.ActivityExplanation.setValidators([Validators.required]);
      } else {
        this.rf!.ActivityExplanation.disable();
        this.rf!.ActivityExplanation.setValidators(null);
        this.rf!.ActivityExplanation.setValue('');
      }
      this.rf!.ActivityExplanation.updateValueAndValidity();
    });

    this.rf!.FindOut.valueChanges.subscribe((value) => {
      if (value === 'Otro / Other') {
        this.rf!.otherFindOut.enable();
        this.rf!.otherFindOut.setValidators([
          Validators.required,
        ]);
      } else {
        this.rf!.otherFindOut.disable();
        this.rf!.otherFindOut.setValidators(null);
      }
      this.rf!.otherFindOut.updateValueAndValidity();
    });

    this.rf!.otherTravelingWith.valueChanges.subscribe((value) => {
      if (value) {
        this.rf!.CompanionExplanation.enable();
        this.rf!.CompanionExplanation.setValidators([
          Validators.required,
        ]);
      } else {
        this.rf!.CompanionExplanation.disable();
        this.rf!.CompanionExplanation.setValidators(null);
        this.rf!.CompanionExplanation.setValue('');
      }
      this.rf!.CompanionExplanation.updateValueAndValidity();
    });

    this.rf!.Agency.valueChanges.subscribe((value) => {
      if (value === 'true') {
        this.rf!.AgencyName.enable();
        this.rf!.AgencyName.setValidators([Validators.required]);
      } else {
        this.rf!.AgencyName.disable();
        this.rf!.AgencyName.setValidators(null);
        this.rf!.AgencyName.setValue('');
      }
      this.rf!.AgencyName.updateValueAndValidity();
    });

    this.rf!.Guide.valueChanges.subscribe((value) => {
      if (value === 'true') {
        this.rf!.GuideName.enable();
        this.rf!.GuideName.setValidators([Validators.required]);
      } else {
        this.rf!.GuideName.disable();
        this.rf!.GuideName.setValidators(null);
        this.rf!.GuideName.setValue('');
      }
      this.rf!.GuideName.updateValueAndValidity();
    });
  }

  getInfoLocalStorage() {
    const activitiesLocalStorage: any = this.authService.getActivitiesInfo();
    const companionsLocalStorage: any = this.authService.getCompanionsInfo();
    const user: any = this.authService.getUserInfo();

    this.rf!.UserId.setValue(user.Id)
    for (let index = 0; index < activitiesLocalStorage.length; index++) {
      this.activitiesToDo[index] = { ...activitiesLocalStorage[index], formControl: this.activitiesFormControl[index] };
    }

    for (let index = 0; index < companionsLocalStorage.length; index++) {
      this.travelingWith[index] = { ...companionsLocalStorage[index], formControl: this.travelingWithFormControl[index] };
    }
  }

  builderForm() {
    this.ruvForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Gender: ['', Validators.required],
      Age: ['', Validators.required],
      Phone: ['', Validators.required],
      Nationality: ['', Validators.required],
      otherNationality: [{ value: '', disabled: true }],
      Residence: ['', Validators.required],
      otherCountryOfResidence: [{ value: '', disabled: true }],
      Department: [''],
      Municipality: [{ value: '', disabled: true }],
      Reason: ['', Validators.required],
      trecking: ['', Validators.required],
      canopy: ['', Validators.required],
      birdwatching: ['', Validators.required],
      learnTheHistoryOfTheSite: ['', Validators.required],
      bikeRiding: ['', Validators.required],
      camping: ['', Validators.required],
      religionActivity: ['', Validators.required],
      otherActivity: ['', Validators.required],
      ActivityExplanation: [{ value: '', disabled: true }],
      Activities: [''],
      FindOut: ['', Validators.required],
      otherFindOut: [{ value: '', disabled: true }],
      byYourself: ['', Validators.required],
      family: ['', Validators.required],
      friends: ['', Validators.required],
      school: ['', Validators.required],
      university: ['', Validators.required],
      travelAgency: ['', Validators.required],
      otherTravelingWith: ['', Validators.required],
      CompanionExplanation: [{ value: '', disabled: true }],
      Companions: [''],
      Agency: ['', Validators.required],
      AgencyName: [{ value: '', disabled: true }],
      Guide: ['', Validators.required],
      GuideName: [{ value: '', disabled: true }],
      CreatedAt: [new Date()],
      UserId: [],
    });
  }

  get rf() {
    return this.ruvForm?.controls;
  }
}
