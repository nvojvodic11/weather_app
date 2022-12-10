import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ArrayUtilsService{

    /**
     * Group objects by key
     * @param arrayOfObjects - array of objects to be grouped
     * @param key - key to be grouped by
     * @returns 
     */
    groupByKey(arrayOfObjects: Array<{}>, key: string): {}{
        const newValue = arrayOfObjects.reduce((newItem: any, existingItem: any) => {
            newItem[existingItem[key]] = newItem[existingItem[key]] || [];
            newItem[existingItem[key]].push(existingItem);
            return newItem;
        }, Object.create(null));

        return newValue;
    }
}
