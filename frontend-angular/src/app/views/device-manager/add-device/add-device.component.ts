import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EMPTY, Subscription} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../core/services/category/category.service";
import {DeviceService} from "../../../core/services/device/device.service";
import {ICategory} from "../../../core/interfaces/category.interface";
import {ToastrService} from "ngx-toastr";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-create-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  public form: FormGroup;
  private sub8n = new Subscription();
  categories: ICategory[] = [{}];
  constructor(private dialogRef: MatDialogRef<AddDeviceComponent>,
              private fb: FormBuilder,
              private deviceService: DeviceService,
              private categoryService: CategoryService,
              private toastr: ToastrService) {

    this.form = fb.group({
      color: [null, [Validators.required]],
      partNumber: [null, [Validators.required]],
      category: [{
        categories: this.categories
      }],
    });
  }
  ngOnInit() {
    this.getCategories();
    console.log(this.form)
  }

  ngOnDestroy(){
    this.sub8n.unsubscribe();
  }

  getCategories(){
    this.sub8n.add(
      this.categoryService
        .getCategories()
        .subscribe((categories)=>this.categories = [...categories])
    )
  }

  create() {
    this.sub8n.add(
      this.deviceService.createDevice(this.form.value)
        .pipe(
          catchError(() => {
            this.toastr.error('Device not Created', 'Error')
            return EMPTY;
          })
        )
      .subscribe(() => {
        this.toastr.success('Device Created', 'Success')
      }));
    this.dialogRef.close(true);
    this.form.reset();
  }

  cancel(){
    this.dialogRef.close(true);
    this.form.reset();
  }
}
