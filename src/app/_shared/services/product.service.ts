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
}
