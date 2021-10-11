import {Component, Inject, OnInit} from '@angular/core';
import {EMPTY, Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../core/services/category/category.service";
import {IDevice} from "../../../core/interfaces/device.interface";
import {DeviceService} from "../../../core/services/device/device.service";
import {ICategory} from "../../../core/interfaces/category.interface";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-remove-device',
  templateUrl: './remove-device.component.html',
  styleUrls: ['./remove-device.component.scss']
})
export class RemoveDeviceComponent implements OnInit {

  private sub8n = new Subscription();
  dataTable : IDevice = {}
  category : ICategory = {}

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<RemoveDeviceComponent>,
              private categoryService: CategoryService,
              private deviceService: DeviceService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataTable = this.data.element
    console.log(this.dataTable)
  }

  ngOnDestroy(): void{
    this.sub8n.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.sub8n.add(
          this.deviceService.deleteDevice(this.dataTable.id)
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
