import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../core/services/category/category.service";
import {EMPTY, Subscription} from "rxjs";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  public form: FormGroup;
  private sub8n = new Subscription();
  constructor(private dialogRef: MatDialogRef<AddCategoryComponent>,
              private fb: FormBuilder,
              public categoryService: CategoryService,
              private toastr: ToastrService) {

    this.form = fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.sub8n.unsubscribe();
  }

  create() {
    this.sub8n.add(this.categoryService.createCategory(this.form.value)
      .pipe(
        catchError(() => {
          this.toastr.error('Category not Created', 'Error')
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.toastr.success('Category Created', 'Success')
      }));
    this.dialogRef.close(true);
    this.form.reset();
  }

  cancel(){
    this.dialogRef.close(true);
    this.form.reset();
  }

}
