import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ItemService } from './item.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
  taxes: any = [];
  selectedRow: number;
  tableFlag: boolean;
  newItemFlag: boolean;
  editItemFlag: boolean;
  warranties: any = [];

  constructor(private router: Router, private itemSer: ItemService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllItemsByClient();
    this.getMeasures();
    this.getTaxes();
    this.selectedRow = -1;
    this.tableFlag = true;
    this.newItemFlag = false;
    this.editItemFlag = false;
    this.warranties = [6, 12, 18];
  }

  back() {
    if(this.tableFlag) {
      this.router.navigate(['home']);
    } else {
      this.tableFlag = true;
      this.newItemFlag = false;
      this.editItemFlag = false;
    }
  }

  getAllItemsByClient() {
    this.itemSer.getAllItemsByClient(JSON.parse(localStorage.getItem('currentUser')).username)
    .subscribe(
      data => {
        this.items = data;
        this.item.supplier = this.items[0].supplier;
      });
  }

  getMeasures() {
    this.itemSer.getMeasures()
    .subscribe(
      data => {
        this.measures = data;
      });
  }

  getTaxes() {
    this.itemSer.getTaxes()
    .subscribe(
      data => {
        this.taxes = data;
      });
  }

  showDetails(selectedItem: any, index: number) {
    this.item = selectedItem;
    this.selectedRow = index;
  }

  newItem() {
    this.tableFlag = false;
    this.newItemFlag = true;
    this.editItemFlag = false;
    this.item = {};
    this.item.externalUniqueKey = Math.random().toString(36).substring(5).toUpperCase();
  }

  editItem() {
    this.tableFlag = false;
    this.newItemFlag = false;
    this.editItemFlag = true;
  }

  saveItem() {
    this.itemSer.saveItem(this.item)
    .subscribe(
      data => {
        if(this.newItemFlag) {
          this.snackBar.open('Uspešno dodat artikal: ', this.item.externalUniqueKey, {
            duration: 2000,
          });
          setTimeout(() => { 
            this.ngOnInit();
          }, 2000);
        } else {
          this.snackBar.open('Uspešno izmenjen artikal: ', this.item.externalUniqueKey, {
            duration: 2000,
          });
          setTimeout(() => { 
            this.ngOnInit();
          }, 2000);
        }
      },
      err => {
        this.snackBar.open('Dogodila se greška: ', err.error.message, {
          duration: 2000,
        });
        setTimeout(() => { 
          this.ngOnInit();
        }, 2000);
    });
  }

  removeItem() {
    if(this.item == null) {
      this.snackBar.open('Pažnja', 'Morate izabrati artikal za brisanje', {
        duration: 2500,
      });
    } else {
      this.itemSer.removeItem(this.item.id)
      .subscribe(
        data => {
          this.snackBar.open('Uspešno je obrisan artikal: ',this.item.externalUniqueKey, {
            duration: 2000,
          });
          setTimeout(() => { 
            this.ngOnInit();
          }, 2000);
        },
        err => {
          this.snackBar.open('Dogodila se greška: ', err.error.message, {
            duration: 2000,
          });
          setTimeout(() => { 
            this.ngOnInit();
          }, 2000);
        });
    }
  }

  /**
   * Required for predefined value for select tag
   * @param item1 
   * @param item2 
   */
  byId(item1: any, item2: any) {
    return item1.id === item2.id;
  }

}
