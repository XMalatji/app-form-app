import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegFormService } from './reg-form.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit {
  formGroup: FormGroup;
  error = '';
  constructor(private fb: FormBuilder, private regService: RegFormService, private router: Router) {
    this.formGroup = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      idNo: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,  Validators.pattern(this.getEmailRegex())]),
    });
  }

  ngOnInit(): void {

  }

  getEmailRegex(): string {
    return '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$';
}

  register(): void {
    if(this.formGroup.valid){
      this.regService.register(this.formGroup.value).subscribe(result => console.log({result}, 'added'));
      console.log('Adding peep', this.formGroup.value);
      this.router.navigateByUrl('users');
    } else {
      this.error = 'Please complete form';
    }
  }
}
