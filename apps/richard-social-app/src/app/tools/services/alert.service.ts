import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService{
  constructor() {}

  success(message: string) {
    Swal.fire({
      text: message,
      icon: 'success',
      confirmButtonColor: '#153156',
      confirmButtonText: 'Close',
    });
  }

  warning(message: string) {
    Swal.fire({
      text: message,
      icon: 'warning',
      confirmButtonColor: '#153156',
      confirmButtonText: 'Close',
    });
  }

  error(message: string) {

    Swal.fire({
      text: message,
      icon: 'error',
      confirmButtonColor: '#153156',
      confirmButtonText: 'Close',
    });
  }
}
