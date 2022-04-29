import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  categoriesRef: any;
  productsRef: any;

  constructor(private db: AngularFirestore,  private storage: AngularFireStorage) {
    this.categoriesRef = db.collection('/categories');
    this.productsRef = db.collection('/products');
  }

  getAllProducts(){
    return this.productsRef;
  }

  editProduct(product) {
    const productRef = this.productsRef.doc(product.id);
    productRef.set(product, {
      merge: true
    })
  }

  deleteProduct(productId){
    const productRef = this.productsRef.doc(productId);
    productRef.delete();
  }

  addNewProduct(product:any, file:any) {
    const filePath = `products/${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.addProductToDatabase(product,downloadURL);
        });
      })
    ).subscribe();
  }

  private addProductToDatabase(product: any, downloadURL: any) {
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
  }


  //category
  addNewCategory(category: any) {
    this.categoriesRef.add({
      name: category
    });
  }
  getAllCategories() {
    return this.categoriesRef;
  }


  makeAllProductsUnavailable() {
    this.productsRef.ref.get().then(function(querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          available: false
        });
      });
    });
  }
}
