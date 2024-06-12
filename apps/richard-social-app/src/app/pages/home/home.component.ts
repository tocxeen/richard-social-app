import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PostFormComponent } from '../../shared/dialog/post-form/post-form.component';
import { PostListComponent } from '../../shared/post-list/post-list.component';
import { AuthService } from '../../tools/services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,PostListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(public dialog: MatDialog, public authService:AuthService) {
  }

  openPostFormDialog(): void {
    this.dialog.open(PostFormComponent, {
      width: '600px',
      height: 'auto',
    });
  }
}
