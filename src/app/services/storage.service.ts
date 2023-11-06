import { Injectable, inject } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage = inject(Storage);

  async subirArchivo(file: File, carpeta: string): Promise<string> {
    const imagenRef = ref(this.storage, `${carpeta}/${file.name}`);
    await uploadBytes(imagenRef, file);

    const imageUrl = getDownloadURL(imagenRef);

    return imageUrl;
  }

  constructor() {}
}
