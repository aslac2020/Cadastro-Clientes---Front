import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PeopleServiceService} from "../../services/people-service.service";
import {People} from "../../models/People";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  title!: string

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private peopleService: PeopleServiceService,
              private snackBar: MatSnackBar
  )
  {}

  callApiPeople(){
    if(this.data.isScreenUpdate == true){
      this.peopleService.updatePeople(this.data.people, this.data.id).subscribe((data: People) => {
        console.log(data)
        this.dialogRef.close();
      })
    }else{

    }

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000});
  }

}
