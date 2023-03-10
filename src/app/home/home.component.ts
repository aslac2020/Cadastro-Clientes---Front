import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {People} from "../Models/People";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";;
import {PeopleServiceService} from "../services/people-service.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  clients!: People[]
  displayedColumns: string[] = ['nome', 'cpf', 'email', 'telefone', 'actions'];
  dataSource!: MatTableDataSource<People>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private peopleService: PeopleServiceService,
    private router: Router

  ){}

  ngOnInit(): void {
  this.getAllPeoples();
  }

  getAllPeoples(){
    this.peopleService.getAllPeoples().subscribe(
      (data: People[]) => {
        console.log(data)
      this.clients = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    }, error => console.log(error));
  }

  navigationToSign(){
    this.router.navigate(['sign'])
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
}
