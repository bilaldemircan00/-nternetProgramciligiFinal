import { ApiService } from 'src/app/services/api.service';
import { Kategori } from './../../../models/Kategori';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    public apiServis: ApiService
  ) { }

  ngOnInit() {
  }

}
