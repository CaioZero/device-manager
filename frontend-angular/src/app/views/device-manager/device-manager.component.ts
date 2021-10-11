import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {of, Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {catchError} from "rxjs/operators";
import {DeviceService} from "../../core/services/device/device.service";
import {IDevice} from "../../core/interfaces/device.interface";
import {RemoveDeviceComponent} from "./remove-device/remove-device.component";
import {AddDeviceComponent} from "./add-device/add-device.component";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-device-manager',
  templateUrl: './device-manager.component.html',
  styleUrls: ['./device-manager.component.scss']
})
export class DeviceManagerComponent implements OnInit,AfterViewInit  {

  public displayedColumns = ['id', 'color', 'partNumber','category'];
  public columnsToDisplay: string[] = [];
  public resultsLength = 0;
  homeButton = false


  public sub8n = new Subscription();
  dataSource = new MatTableDataSource([]);

  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog,
              private deviceService: DeviceService,
              private route: ActivatedRoute,
  ) {
    this.route.data.subscribe(value => {
      this.homeButton = value.actions
    })
    // @ts-ignore
    this.homeButton
      ? this.columnsToDisplay = [...this.displayedColumns, 'actions']
      : this.columnsToDisplay = [...this.displayedColumns]
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadDataSource();
  }

  ngOnDestroy(){
    this.sub8n.unsubscribe();
  }

  loadDataSource() {
    this.dataSource.data = [];
    this.sub8n.add(
      this.deviceService
        .getDevices()
        .pipe(
          catchError(() => {
            return of([]);
          })
        )
        .subscribe((result: IDevice[]) => {
          // @ts-ignore
          this.dataSource.data = [...result]
          this.resultsLength = result.length
        })
    )
  }

  create(element: any) {
    const dialogRef = this.dialog.open(AddDeviceComponent, {
      width: '250px',
      data: {element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.loadDataSource();
    });

  }

  delete(element: IDevice) {
    const dialogRef = this.dialog.open(RemoveDeviceComponent, {
      data: {element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDataSource();
      }
    });
  }
}
