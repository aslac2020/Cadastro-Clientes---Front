import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PeopleServiceService} from "../../services/people-service.service";
import {People} from "../../models/People";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HomeComponent} from "../../pages/home/home.component";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  title!: string

  @Input() homePage =  HomeComponent

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private peopleService: PeopleServiceService,
              private snackBar: MatSnackBar
  )
  {}

  callApiPeople(){
    if(this.data.isScreenUpdate == true){
      this.peopleService.updatePeople(this.data.people, this.data.id).subscribe((data: People) => {
        this.openSnackBar('Usuário alterado com sucesso :)')
        this.dialogRef.close();
      })
    }else if(this.data.isScreenDelete == true){
      this.peopleService.deletePeople(this.data.id).subscribe((data: any) => {
        this.openSnackBar('Usuário excluido com sucesso :)')
        this.dialogRef.close();
        location.reload();
      })
    }

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000});
  }

}
