import { ToastrService } from 'src/app/services/toastr.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {
  isSuccess: boolean | undefined

  constructor(
    private toastrService: ToastrService
  ) {
    this.toastrService.isSuccess$.subscribe(
      res => {
        if(res === true || res === false){
          this.isSuccess = res
          setTimeout(() => {
            this.isSuccess = undefined
          }, 5000);
        }
      });
  }

  ngOnInit(): void {
  }


}
