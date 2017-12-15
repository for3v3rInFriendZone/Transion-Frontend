import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatSelectModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule {}