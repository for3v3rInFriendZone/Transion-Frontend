import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ItemService } from './item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ItemService],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {

  items: any = [];
  item: any = {};
  measures: any = [];
  tableFlag: boolean;
  newItemFlag: boolean;
  warranties: any = [];

  constructor(private router: Router, private itemSer: ItemService) { }

  ngOnInit() {
    this.getAllItemsByClient();
    this.getMeasures();
    this.tableFlag = true;
    this.newItemFlag = false;
    this.item.externalUniqueKey = Math.random().toString(36).substring(5);
    this.warranties = [6, 12, 18];
  }

  back() {
    this.router.navigate(['home']);
  }

  getAllItemsByClient() {
    this.itemSer.getAllItemsByClient(JSON.parse(localStorage.getItem('currentUser')).username)
    .subscribe(
      data => {
        this.items = data;
      });
  }

  getMeasures() {
    this.itemSer.getMeasures()
    .subscribe(
      data => {
        this.measures = data;
      });
  }

  newItem() {
    this.tableFlag = false;
    this.newItemFlag = true;
  }

}
