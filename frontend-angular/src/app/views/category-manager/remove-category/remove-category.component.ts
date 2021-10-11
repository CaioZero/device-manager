import {Component, Inject, OnInit} from '@angular/core';
import {CategoryService} from "../../../core/services/category/category.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EMPTY, Subscription} from "rxjs";
import {ICategory} from "../../../core/interfaces/category.interface";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-remove-category',
  templateUrl: './remove-category.component.html',
  styleUrls: ['./remove-category.component.scss']
})
export class RemoveCategoryComponent implements OnInit {

  private sub8n = new Subscription();
  dataTable : ICategory = {}

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<RemoveCategoryComponent>,
              private service: CategoryService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
   this.dataTable = this.data.element
  }

  ngOnDestroy(): void{
    this.sub8n.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.sub8n.add(this.service.deleteCategory(this.dataTable.id)
      .pipe(
        catchError(() => {
          this.toastr.error('Device not Removed', 'Error')
          return EMPTY;
        })
      ).subscribe(() => {
        this.toastr.success('Device Removed', 'Success')
      })
    )
  }

}
