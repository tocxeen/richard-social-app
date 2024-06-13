import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppState } from '../../../tools/store/app.state';
import { setLoadingSpinner } from '../../../tools/states/shared/shared.actions';
import { loginStart } from '../../../tools/states/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const username = this.form.value.username!;
    const password = this.form.value.password!;
    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(loginStart({username:username,password:password}));

  }

}
