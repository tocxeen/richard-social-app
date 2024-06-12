import { Component } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AppState } from '../../../tools/store/app.state';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { setLoadingSpinner } from '../../../tools/states/shared/shared.actions';
import { postStart } from '../../../tools/states/post/post.action';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})

export class PostFormComponent {



  form: FormGroup;

  constructor(private store:Store<AppState>,public dialogRef: MatDialogRef<PostFormComponent>,private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      published: [false, [Validators.required]],
    });
  }


  ngOnInit(): void {
  }

  onSubmit() {
    const title = this.form.value.title!;
    const content = this.form.value.content!;
    const published = this.form.value.published!;

    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(postStart({title:title,content:content,published:published}));

  }
}
