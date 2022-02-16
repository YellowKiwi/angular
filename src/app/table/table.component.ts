import {Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { ModalComponent } from '../modal/modal.component';
import { Project } from '../modal/modal.component';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  userList !: MatTableDataSource<[]>;
  errorMessage : string = '';
  displayedColumns : string[] = ['id', 'status', 'firstname', 'lastname', 'practice', 'saga', 'grade', 'work', 'editar', 'ver'];
  proyectos : Project[] = [];
  @ViewChild(MatPaginator)
  paginator !: MatPaginator;
  @ViewChild(MatSort) 
  sort !: MatSort;

  constructor(private usersService: UsersService, public dialog: MatDialog, private router: Router){}
  
  ngOnInit(): void {
    let currentUrl = this.router.url;
    
    if (currentUrl === '/employeeList') {
      this.usersService.getUsers().subscribe({
        next: users => {
          this.userList = new MatTableDataSource<[]>(users);
          this.userList.paginator = this.paginator;
          this.userList.sort = this.sort;
        },
        error: err => this.errorMessage = err
      });
    } else {
      let id = currentUrl.split('/')[2];
      this.usersService.getUser(id).subscribe({
        next: user => {
          this.userList = new MatTableDataSource<[]>([user]);
          this.userList.paginator = this.paginator;
          this.userList.sort = this.sort;
        },
        error: err => this.errorMessage = err
      });
    }
  }

  openDialog(details: any, modo: string) {
    let startedYear = parseInt(details.createdAt.split('-')[0]);
    let years = new Date().getFullYear() - startedYear;
    let antiquity = years == 0 ? '< 1 año' : years == 1 ? years + ' año' : years + ' años';
    details.projects.forEach((element: Project) => {
      this.proyectos.push(element);
    });
    this.dialog.open(ModalComponent, {
      height: '50%',
      width: '50%',
      data: {
        name: details.firstname + ', ' +details.lastname,
        email: details.email,
        city: details.city,
        office: details.office,
        areaLeader: details.areaLeader,
        exit: details.exit,
        keyPeople: details.keyPeople,
        antiquity: antiquity,
        updatedAt: details.updatedAt,
        projects: this.proyectos,
        modo: modo
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userList.filter = filterValue.trim().toLowerCase();

    if (this.userList.paginator) {
      this.userList.paginator.firstPage();
    }
  }

  onClickEditar(row: any) {
    row.editable = !row.editable;
    if (row.editable === false) {
      this.usersService.editUser(row).subscribe({
        error: err => {
          alert('Error!');
        },
        complete: () => {
          confirm('Empleado modificado!');
        }
      });
    }
  }
}
