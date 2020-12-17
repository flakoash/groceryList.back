import { Item } from '../models/itemModel'
import {ItemInputInterface, ItemInterface} from '../interfaces/itemInterface'

export default class ItemService {

    constructor (private ItemModel: typeof Item) {
    }

    public async add(item: ItemInterface) {
        const newItem = new Item(item);
        try {
            let result = await newItem.save()
            return {success: true, result: result};
        } catch (error) {
            return {success: false, result: error};
        }
    }

    public async get() {
        try {
            const items = await Item.find();
            return {success: true, result: items};
        } catch (error) {
            return {success: false, result: error};
        }
    }

    public async getById(id:string) {
        try {
            const item = await Item.findById(id);
            return {success: true, result: item};
        } catch (error) {
            console.log(error)
            return {success: false, result: error};
        }
    }

    public async edit(id:string, item: ItemInterface) {
        try {
            const found_item = await Item.findById(id);
            if(!found_item) return {success: true, result: found_item};

            let result2 = await Item.updateOne({_id: id}, {$set: item})
            return {success: true, result: result2};
        } catch (error) {
            return {success: false, result: error};
        }
    }

    public async remove(id:string) {
        try{
            let result = await Item.deleteOne({_id: id})
            return {success: true, result: result};
        } catch (error) {
            return {success: false, result: error};
        }
    }
}