import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  categoriesRef: any;
  productsRef: any;

  configSnackBar = new MatSnackBarConfig();

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private _snackBar: MatSnackBar, private router: Router) {
    this.configSnackBar.duration = 2000;
    this.configSnackBar.verticalPosition = 'top';
    this.configSnackBar.panelClass = ['my_snackBar'];

    this.categoriesRef = db.collection('/categories');
    this.productsRef = db.collection('/products');
  }

  //get products
  getAllProducts() {
    return this.productsRef;
  }

  getProductById(productId) {
    const productRef = this.productsRef.doc(productId);
    return productRef;
  }

  //get products


  //edit products
  editProduct(product) {
    const productRef = this.productsRef.doc(product.id);
    productRef.set(product, {
      merge: true
    })

    this._snackBar.open("Edit product successfully", "", this.configSnackBar);
  }

  //edit products


  //delete product
  deleteProduct(productId) {
    const productRef = this.productsRef.doc(productId);
    productRef.delete();

    this._snackBar.open("Product deleted successfully", "", this.configSnackBar);
  }

  //delete product


  //start add new product
  addNewProduct(product: any, file: any) {
    const filePath = `products/${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    uploadTask.then(
      res => {
        console.log(res);
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log(downloadURL);
          this.addProductToDatabase(product, downloadURL);
        });
      }, err => {
        console.log(err);
      }
    );
  }

  private addProductToDatabase(product: any, downloadURL: any) {
    console.log(product);
    this.productsRef.add({
      title: product.title,
      description: product.description,
      normalPrice: product.normalPrice,
      discountPrice: product.discountPrice,
      category: product.category.name,
      category_id: product.category.id,
      weight: product.weight,
      available: false,
      photoUrl: downloadURL
    })
    this._snackBar.open("Product added successfully", "", this.configSnackBar);
  }

  //end add new product


  makeAllProductsUnavailable() {
    this.productsRef.ref.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          available: false
        });
      });
    })
  }

  setProductToUnavailable(id:any){
    const prodcutRef = this.productsRef.doc(id);
    prodcutRef.update({
      available: false
    })
  }


  //start category
  addNewCategory(category: any) {
    this.categoriesRef.add({
      name: category,
      order: 1000
    });
    this._snackBar.open("New category added successfully", "", this.configSnackBar);
  }

  deleteCategory(id){
    const categoryRef = this.categoriesRef.doc(id);
    categoryRef.delete();
    this._snackBar.open("Category deleted successfully", "", this.configSnackBar);
  }

  getAllProductsWithCategory(id){
    return this.db.collection('/products',ref => ref.where('category_id', '==', id));
  }

  getAllCategories() {
    return this.categoriesRef;
  }

  setNewCategoriesOrder(allCategories: any[]) {
    allCategories.forEach(category => {
      const categoryRef = this.categoriesRef.doc(category.id);
      categoryRef.update({order: category.order});
    })
    this._snackBar.open("Categories order changed successfully", "", this.configSnackBar);
  }

  //end category


}
