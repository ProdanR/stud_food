import {MatTableDataSource} from '@angular/material/table';
import * as _ from 'lodash';

export class DatasourceBuilder {
  private tableData: any[];
  private category: string;
  private available: string;
  private searchTitle: string;

  constructor() {
    this.tableData = [];
  }

  withCategory(category: string): DatasourceBuilder {
    this.category = category;
    return this;
  }

  withAvailable(available: string): DatasourceBuilder {
    this.available = available;
    return this;
  }

  withSearchTitle(searchTitle: string): DatasourceBuilder {
    this.searchTitle = searchTitle;
    return this;
  }

  withTableData(tableData: any[]): DatasourceBuilder {
    this.tableData = tableData;
    return this;
  }


  // tslint:disable-next-line:no-shadowed-variable
  init(): any[] {
    this.searchTitleMethod();
    this.searchCategoryMethod();
    this.searchAvailableMethod();
    return this.tableData;
  }

  private searchTitleMethod() {
    if (this.searchTitle.length >= 3) {
      this.tableData = this.tableData.filter(item => {
        return item.title.toLowerCase().includes(this.searchTitle.toLowerCase());
      });
    }
  }

  private searchCategoryMethod() {
    if (this.category !== 'All') {
      this.tableData = this.tableData.filter(item => {
        return item.category === this.category;
      });
    }
  }

  private searchAvailableMethod() {
    if (this.available !== 'All') {
      this.tableData = this.tableData.filter(item => {
        if (this.available === 'Available')
          return item.available === true;
        else
          return item.available === false;
      });
    }
  }
}
