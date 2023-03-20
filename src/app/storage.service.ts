import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor(private storage: Storage) {
        this.storage.create();
    }

    async setValue(key: string, value: any): Promise<void> {
        await this.storage.set(key, value);
    }

    async getValue(key: string): Promise<any> {
        return await this.storage.get(key);
    }
}