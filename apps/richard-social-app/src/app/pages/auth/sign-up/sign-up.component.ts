import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppState } from '../../../tools/store/app.state';
import { Store } from '@ngrx/store';
import { Register } from '../../../tools/models';
import { setLoadingSpinner } from '../../../tools/states/shared/shared.actions';
import { registerStart } from '../../../tools/states/auth/auth.actions';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {

  form = new FormGroup({
    username: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")]),
    password: new FormControl('',[Validators.required]),
  });

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);
    const form = this.form.value;
    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(registerStart({username:form.username!,email:form.email!,password:form.password!}));
  }
}
