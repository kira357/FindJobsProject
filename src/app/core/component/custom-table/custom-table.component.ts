import { SelectionModel } from "@angular/cdk/collections";
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { fadeInUp400ms } from "../../animations/fade-in-up.animation";
import { stagger40ms } from "../../animations/stagger.animation";
import { TableColumn } from "../../interfaces/table-column.interface";
import { PagingParams } from "../../model/paging-params";
import { merColModel } from "./custom-table.model";

@UntilDestroy()
@Component({
    selector: "custom-table",
    templateUrl: "./custom-table.component.html",
    styleUrls: ["./custom-table.component.scss"],
    animations: [fadeInUp400ms, stagger40ms],
})
export class CustomTableComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() columns: any[] = [];
    @Input() columnsMerge: any[]=[];
    @Input() pagingParams: PagingParams;
    @Input() rows: any[] = [];
    @Input() amtRows: number = 0;
    @Input() showAddButton: boolean = false;
    @Input() showFilterButton: boolean = true;
    @Input() showPaginator: boolean = true;
    @Input() heightTb: number = 0;
    @Input() title: string = '';

    @Output() onRowClick = new EventEmitter<any>();
    @Output() onRowDbClick = new EventEmitter<any>();
    @Output() onAdd = new EventEmitter<any>();
    @Output() onEdit = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();
    @Output() onPageChanged = new EventEmitter<PagingParams>();
    @Output() onCheckedRows = new EventEmitter<any[]>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    // @ViewChild(MatSort, { static: false })
    // set sort(value: MatSort) {
    //     this.dataSource.sort = value;
    // }

    searchCtrl = new FormControl();
    dataSource: MatTableDataSource<any> | null;
    dataSource1: MatTableDataSource<any> | null;
    selectedRow :any;
    pageSizeOptions: number[] = [5, 10, 20, 50, 100, 150, 200, 300, 500, 1000];

    selection = new SelectionModel<any>(true, []);
    heightTable: number = 0;
    arrColMerge: string[] = [];

    constructor() { }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes["rows"]) {
            this.selection.clear();
            if (changes["rows"]["currentValue"]) this.loadData(true);
        }
        if (changes["showPaginator"]) {
            if (changes["showPaginator"]["currentValue"])this.showPaginator = changes["showPaginator"]["currentValue"]
        }
    }

    ngOnInit() {
      this.columnsMerge as merColModel[]
        console.log('columnsMerge====', this.columnsMerge);
        if (this.columnsMerge && this.columnsMerge.length > 0) {
            this.arrColMerge = this.columnsMerge.map(p => { return p.field })
        }
        this.searchCtrl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe((value) => this.onFilterChange(value));
    }

    loadData(loading: boolean) {
        if (!loading) return;

        this.selectedRow = null;
        this.pagingParams.totalRows = this.pagingParams.totalRows;
        this.dataSource = new MatTableDataSource(this.rows as any[]);
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        this.calcHeightTable();
    }

    onFilterChange(value: string) {
        if (!this.dataSource) {
            return;
        }
        value = value.trim();
        value = value.toLowerCase();
        this.dataSource.filter = value;
    }

    ngAfterViewInit() {
        if (this.rows) {
            this.loadData(false);
            this.paginator.page.subscribe(() => {
                this.loadData(false);
            });
        }
    }

    toggleColumnVisibility(column :any, event :any) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        column.visible = !column.visible;
    }

    trackByProperty<T>(index: number, column: TableColumn<T>) {
        return column.property;
    }

    get visibleColumns() {
      this.columns as TableColumn<any>[]  
        return this.columns
            .filter((column) => column.visible)
            .map((column) => column.property);
    }

    handleRowClick(row: any) {
        this.selectedRow = row;
        this.onRowClick.emit(row);
    }

    handleRowDbClick(row: any) {
        this.selectedRow = row;
        this.onRowDbClick.emit(row);
    }

    handleAdd() {
        this.onAdd.emit();
    }

    handleEdit(row: any) {
        this.selectedRow = row;
        this.onEdit.emit(row);
    }

    handleDelete(row: any) {
        this.selectedRow = row;
        this.onDelete.emit(row);
    }

    pageChanged(event: PageEvent) {
        this.pagingParams.currentPage = event.pageIndex;
        this.pagingParams.pageSize = event.pageSize;
        this.onPageChanged.emit(this.pagingParams);
    }

    calcHeightTable() {
        if (this.heightTb) {
            this.heightTable = this.heightTb;
        } else {
            if (this.rows.length > 0) {
                if (this.amtRows > 0 && this.amtRows < this.rows.length) {
                    this.heightTable = this.amtRows * 28 + 36;
                } else {
                    this.heightTable =
                        this.rows.length > 20 ? 568 : this.rows.length * 28 + 36;
                }
            } else {
                this.heightTable = 40;
            }
        }
    }

    /** handle all check column */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource!.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource!.data.forEach((row) => this.selection.select(row));
        this.onCheckedRows.emit(this.selection.selected);
    }
    onChangeRow(row: any) {
        this.selection.toggle(row);
        this.onCheckedRows.emit(this.selection.selected);
    }
}
