import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "../../core/services/category/category.service";
import {ICategory} from "../../core/interfaces/category.interface";
import {catchError} from "rxjs/operators";
import {of, Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AddCategoryComponent} from "./add-category/add-category.component";
import {RemoveCategoryComponent} from "./remove-category/remove-category.component";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent implements OnInit, AfterViewInit{

  public displayedColumns = ['id', 'name'];
  public columnsToDisplay: string[] = [];
  private sub8n = new Subscription();
  public resultsLength = 0;
  homeButton = false;

  dataSource = new MatTableDataSource([]);

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
  private categoryService: CategoryService,
              private location: Location,
              private route: ActivatedRoute
  ) {
    this.route.data.subscribe(value => {
      this.homeButton = value.actions
    })
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

  ngOnDestroy():void{
    this.sub8n.unsubscribe();
  }

  loadDataSource() {
    this.dataSource.data = [];
    this.sub8n.add(
      this.categoryService
        .getCategories()
        .pipe(
          catchError(() => {
            return of([]);
          })
        )
        .subscribe((result: ICategory[]) => {
          // @ts-ignore
          this.dataSource.data = [...result]
          this.resultsLength = result.length

        })
    );

  }

  create() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.loadDataSource()
    });

  }

  delete(element: ICategory) {
    const dialogRef = this.dialog.open(RemoveCategoryComponent, {
      data: {element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.loadDataSource();
      }
    });
  }

}
