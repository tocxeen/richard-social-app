import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [CommonModule,NavBarComponent,FooterComponent,RouterOutlet],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.css',
})
export class FrameComponent {}
