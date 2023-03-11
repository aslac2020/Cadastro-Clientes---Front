import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {People} from "../../models/People";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";;
import {PeopleServiceService} from "../../services/people-service.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../components/dialog/dialog.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  clients!: People[]
  displayedColumns: string[] = ['nome', 'cpf', 'email', 'telefone', 'actions'];
  dataSource!: MatTableDataSource<People>;
  isHavePeoples: boolean = false;
  id: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private peopleService: PeopleServiceService,

    private router: Router,
    private dialog: MatDialog

  ){}

  ngOnInit(): void {
  this.getAllPeoples();
  }

  getAllPeoples(){
    this.peopleService.getAllPeoples().subscribe(
      (data: People[]) => {
        if(data.length < 1){
          this.isHavePeoples = false;
          return;
        }
      this.clients = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
        this.isHavePeoples = true
    }, (error)  => {
        console.log(error);
      }

    );
  }

  navigationToSign(){
    this.router.navigate(['register'])
  }

  visualizedPeople(id: number){
    this.router.navigate(['view/', id])
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  editPeople(id: number) {
   this.router.navigate(['edit/', id])

  }

  deletePeople(id: number) {

    let msg = "Deseja excluir esse usuário?";
    let isDelete = true;

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '200px',
      data: {msg:msg, id: id, isScreenDelete: isDelete }
    })
  }
}
