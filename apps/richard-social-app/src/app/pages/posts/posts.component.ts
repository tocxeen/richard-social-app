import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PostFormComponent } from '../../shared/dialog/post-form/post-form.component';
import { PostListComponent } from '../../shared/post-list/post-list.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule,PostListComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  constructor(public dialog: MatDialog) {}

  openPostFormDialog(): void {
    this.dialog.open(PostFormComponent, {
      width: '600px',
      height: 'auto',
    });
  }
}
