import { Component, ViewChild } from '@angular/core';
import { RecipeAddComponent } from "../../recipe-add/recipe-add.component";
import { RecipeEditComponent } from "../../recipe-edit/recipe-edit.component";
import { ColDef } from "ag-grid-community";
import { ViewAndEditCellComponent } from "../../common/view-and-edit-cell/view-and-edit-cell.component";
import { ProductAddComponent } from "../product-add/product-add.component";
import { ProductEditComponent } from "../product-edit/product-edit.component";
import { take } from "rxjs";
import { BackEndService } from "../../services/back-end.service";
import { EditCellComponent } from "../../common/edit-cell/edit-cell.component";

const GET_PRODUCT = '/product/all'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  @ViewChild(ProductAddComponent) productAddComponent!: ProductAddComponent;
  @ViewChild(ProductEditComponent) productEditComponent!: ProductEditComponent;

  context = { componentParent: this };
  productList: any[] = [];
  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name' },
    { field: 'type' },
    { field: 'description' },
    { field: 'selling_price', headerName: 'Price',
      valueFormatter: params => params.data.selling_price.toFixed(2),
    },
    { field: 'recipe',
      valueFormatter: (params: any) =>( !params && !params.data && !params.data.recipe ) ? 'No Recipe': params.data?.recipe.name,
    },
    {
      field: '',
      cellRenderer: EditCellComponent
    }
  ];

  constructor(private backEndService: BackEndService) {
    this.getProductData();
  }

  getProductData() {
    this.backEndService.getRequest(GET_PRODUCT)
      .pipe(take(1))
      .subscribe(
        { next: (response) => this.productList = response }
      )
  }

  openModalFromCellRenderer(data: any) {
    // Pass the data to the modal component
    console.log('call from ell renderer')
    this.productEditComponent.openEditModal(data);
  }

  openAddModal() {
    this.productAddComponent.openAddProductModal();
  }

  onAddModalClosed($eventData: any) {
    let tempList = []
    for (let ingredient of this.productList){
      if ($eventData.id != ingredient.id){
        tempList.push(ingredient)
      } else {
        tempList.push($eventData)
      }
    }
    // to trigger grid update
    this.productList = [...tempList];
  }

  onEditModalClosed($event: any) {
    this.productAddComponent.openAddProductModal();
  }
}
