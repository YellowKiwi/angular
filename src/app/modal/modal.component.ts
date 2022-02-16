import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

export interface UserDetail {
  name: string;
  email: string;
  city: string;
  office: string;
  areaLeader: string;
  exit: string;
  keyPeople: string;
  antiquity: string;
  updatedAt: Date;
  projects: Project[];
}

export interface Project {
  cod: number;
  division: string;
  leader: string;
  bill: number;
  rol: string;
  createdAt: Date;
  work: number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  displayedColumns: string[] = ['cod', 'division', 'leader', 'bill', 'rol', 'createdAt', 'work'];
  projectList!: MatTableDataSource<Project>;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: UserDetail) { }

  ngOnInit(): void {
    this.projectList = new MatTableDataSource<Project>(this.data.projects);
  }

}
