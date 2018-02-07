import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesService } from './invoices.service';
import { Event } from '@angular/router/src/events';

@Component({
    selector: 'invoices',
    templateUrl: 'invoices.component.html',
    styles: [require('./invoices.component.css').toString()],
    providers: [InvoicesService]
})

export class InvoicesComponent implements OnInit {

    items: any[];
    invoiceItems: any[];
    invoiceItem: any;
    selectedItem: any;
    newItemFlag: boolean;
    displayDialog: boolean;
    sortO: number;
    sortF: string;

    constructor(private router: Router, private invServ: InvoicesService) { }

    ngOnInit() {
        this.newItemFlag = false;
        this.displayDialog = false;
        this.invoiceItems = [];
        this.items = [];
        this.sortO = 1;
        this.sortF = '';
    }

    changeSort(event) {
        this.sortF = event.field;
    }

    showAddDialog() {
        this.newItemFlag = true;
        this.invoiceItem = {};
        this.displayDialog = true;
    }

    save() {
        let invoiceItems = [...this.invoiceItems];
        if (this.newItemFlag)
            invoiceItems.push(this.invoiceItem);
        else
            invoiceItems[this.findSelectedItemIndex()] = this.invoiceItem;

        this.invoiceItems = invoiceItems;
        this.invoiceItem = null;
        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedItemIndex();
        this.invoiceItems = this.invoiceItems.filter((val, i) => i != index);
        this.invoiceItem = null;
        this.displayDialog = false;
    }

    onRowSelect(event: any) {
        this.newItemFlag = false;
        this.invoiceItem = this.cloneInvoiceItem(event.data);
        this.displayDialog = true;
    }

    cloneInvoiceItem(item: any): any {
        let invItem = {};
        for (let prop in item) {
            invItem[prop] = item[prop];
        }
        return invItem;
    }

    findSelectedItemIndex(): number {
        return this.invoiceItems.indexOf(this.selectedItem);
    }

    filterItemSingle(event: any) {
        let query = event.query;
        this.items = [
            {
                "id": 1,
                "externalUniqueKey": "euk-1",
                "name": "Cokolada",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 89,
                "sellingPrice": 92,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 2,
                "externalUniqueKey": "euk-2",
                "name": "Keks",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 89,
                "sellingPrice": 92,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 3,
                "externalUniqueKey": "euk-3",
                "name": "Sladoled",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 35,
                "sellingPrice": 40.5,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 4,
                "externalUniqueKey": "euk-4",
                "name": "Praline",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 111,
                "sellingPrice": 112,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 5,
                "externalUniqueKey": "euk-5",
                "name": "Deodorant",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 230,
                "sellingPrice": 245,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 6,
                "externalUniqueKey": "euk-6",
                "name": "Kuglica",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 121,
                "sellingPrice": 127,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 7,
                "externalUniqueKey": "euk-7",
                "name": "Safun",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 89,
                "sellingPrice": 100,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 8,
                "externalUniqueKey": "euk-8",
                "name": "Cvet",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 126,
                "sellingPrice": 145,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 9,
                "externalUniqueKey": "euk-9",
                "name": "Cokolada",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 89,
                "sellingPrice": 92,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 10,
                "externalUniqueKey": "euk-10",
                "name": "Keks",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 89,
                "sellingPrice": 92,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 11,
                "externalUniqueKey": "euk-11",
                "name": "Sladoled",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 35,
                "sellingPrice": 40.5,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 12,
                "externalUniqueKey": "euk-12",
                "name": "Praline",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 111,
                "sellingPrice": 112,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 13,
                "externalUniqueKey": "euk-13",
                "name": "Deodorant",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 230,
                "sellingPrice": 245,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 14,
                "externalUniqueKey": "euk-14",
                "name": "Kuglica",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 121,
                "sellingPrice": 127,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 15,
                "externalUniqueKey": "euk-15",
                "name": "Safun",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 89,
                "sellingPrice": 100,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 16,
                "externalUniqueKey": "euk-16",
                "name": "Cvet",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 126,
                "sellingPrice": 145,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 17,
                "externalUniqueKey": "euk-17",
                "name": "Cokolada",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 89,
                "sellingPrice": 92,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 18,
                "externalUniqueKey": "euk-18",
                "name": "Keks",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 89,
                "sellingPrice": 92,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 19,
                "externalUniqueKey": "euk-19",
                "name": "Sladoled",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 35,
                "sellingPrice": 40.5,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 20,
                "externalUniqueKey": "euk-20",
                "name": "Praline",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 111,
                "sellingPrice": 112,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 21,
                "externalUniqueKey": "euk-21",
                "name": "Deodorant",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 230,
                "sellingPrice": 245,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 22,
                "externalUniqueKey": "euk-22",
                "name": "Kuglica",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 121,
                "sellingPrice": 127,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 23,
                "externalUniqueKey": "euk-23",
                "name": "Safun",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 89,
                "sellingPrice": 100,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            },
            {
                "id": 24,
                "externalUniqueKey": "euk-24",
                "name": "Cvet",
                "description": null,
                "warranty": null,
                "supplier": {
                    "id": 1,
                    "name": "Firma 1",
                    "pib": "3129",
                    "externalUniqueKey": "9403D30L",
                    "telephone": "021223218",
                    "email": "firma1@gmail.com",
                    "address": "Kisacka 111",
                    "createdOn": 1488495600000,
                    "updatedOn": 1491256800000,
                    "status": "BUYER",
                    "bankAccount": "3902903223"
                },
                "purchasePrice": 126,
                "sellingPrice": 145,
                "measure": {
                    "id": 1,
                    "name": "Komad",
                    "shortcut": "kom"
                },
                "tax": {
                    "id": 2,
                    "name": "20%",
                    "base": 20
                }
            }
        ]
    }

    filterItem(query, items: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < items.length; i++) {
            let item = items[i];
            if(item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }
        return filtered;
    }

    back() {
        this.router.navigate(['početna']);
    }




}