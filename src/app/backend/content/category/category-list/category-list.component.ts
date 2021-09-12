import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
  title: string = 'List Data';
  filename: string = 'List Data';
  columns: Array<Number> = [0,1,2];
  dtOptions: any = {};
  
  ListData: Category[] = [];

  constructor(private service: CategoryService) { }


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
    this.service.getAll().subscribe(category => this.ListData = category);
  }

  delete(data: Category): void {
    this.ListData = this.ListData.filter(h => h !== data);
    this.service.delete(data.id).subscribe();
  }

}
