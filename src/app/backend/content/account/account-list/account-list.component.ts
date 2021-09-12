import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  title: string = 'List Data';
  filename: string = 'List Data';
  columns: Array<Number> = [0,1,2,3,4];
  dtOptions: any = {};

  ListData: Account[] = [];

  constructor(private service: AccountService) { }


  ngOnInit(): void {
    this.getAll();

    this.dtOptions = {
      pageLength: 5,
      processing: true,
      responsive: true,
      autoWidth: false,
      dom: '<"row"<"col-sm-12 col-md-3"l><"col-sm-12 col-md-6"B><"col-sm-12 col-md-3"f>>' +
            '<"row"<"col-sm-12"tr>>' +
            '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
      buttons: [
        {
          extend      : 'copy',
          text        : '<i class="far fa-copy"></i> Copy',
          titleAttr   : 'Copy',
          className   : 'btn btn-default btn-sm',
          exportOptions: {
            columns: this.columns
          },
          title: this.title,
          footer: true,
        },
        {
          extend      : 'csv',
          title       : this.title,
          text        : '<i class="far fa-file"></i> CSV',
          titleAttr   : 'CSV',
          className   : 'btn btn-default btn-sm',
          exportOptions: {
            columns: this.columns
          },
          filename: this.filename,
          footer: true,
        },
        {
          extend      : 'excel',
          title       : this.title,
          text        : '<i class="far fa-file-excel"></i> Excel',
          titleAttr   : 'Excel',
          className   : 'btn btn-default btn-sm',
          exportOptions: {
            columns: this.columns
          },
          filename: this.filename,
          footer: true,
        },
        {
          extend      : 'pdf',
          title       : this.title,
          oriented    : 'potrait',
          pageSize    : 'LEGAL',
          // download    : 'open',
          text        : '<i class="far fa-file-pdf"></i> PDF',
          titleAttr   : 'PDF',
          className   : 'btn btn-default btn-sm',
          exportOptions: {
            columns: this.columns
          },
          filename: this.filename,
          footer: true,
        },               
        {
          extend      : 'print',
          title       : this.title,
          text        : '<i class="fas fa-print"></i> Print',
          titleAttr   : 'Print',
          className   : 'btn btn-default btn-sm',
          exportOptions: {
            columns: this.columns
          },
          footer: true,
        },
        {
          extend      : 'colvis',
          title       : this.title,
          text        : '<i class="fas fa-columns"></i> Colvis',
          titleAttr   : 'Colvis',
          className   : 'btn btn-default btn-sm',
          exportOptions: {
            columns: this.columns
          },
          footer: true,
        },
      ]
    };
  }

  getAll(): void {
    this.service.getAll().subscribe(product => this.ListData = product);
  }

  delete(data: Account): void {
    this.ListData = this.ListData.filter(h => h !== data);
    this.service.delete(data.id).subscribe();
  }

}
