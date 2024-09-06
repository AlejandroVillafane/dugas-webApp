import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private readonly _snackBar = inject(MatSnackBar)
  showsSnackBar(message: string, action: string = 'OK') :void{
    this._snackBar.open(message, action,{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition:'bottom',
    })

    }
}
