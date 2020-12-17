import { Request, Response, NextFunction, Router} from 'express';
import ItemService from '../Services/itemService';
// import models
import { Item } from '../models/itemModel';
// import auth
import {validateToken} from "./authRoutes";

const router = Router();
let itemService = new ItemService(Item)

router.get('/', async (req: Request, res: Response) => {
    const {success, result} = await itemService.get();
    if(success) {
        res.status(200).json(result);
    }
    else {
        res.status(500).json({message: result.message});
    }
})

router.get('/:id', validateToken,async (req, res) => {
    const {success, result} = await itemService.getById(req.params.id);
    if(success) {
        if (!result) res.status(404).json({message: 'item not found'});
        res.status(200).json(result);
    } 
    else {
        res.status(500).json({message: result.message});
    }
})

router.post('/', async (req, res) => {
    const {success, result} = await itemService.add(req.body);
    if(success) {
        res.status(201).json(result);
    }
    else {
        res.status(500).json({message: result.message});
    }

})

router.put('/:id', async (req, res) => {
    const {success, result} = await itemService.edit(req.params.id, req.body);
    if(success) {
        if (!result) res.status(404).json({message: 'item not found'});
        res.status(200).json(result);
    } 
    else{
        res.status(500).json({message: result.message});
    }
})

router.delete('/:id', async (req, res) => {
    const {success, result} = await itemService.remove(req.params.id);
    if(success){
        res.status(200).json(result);
    }
   else {
        res.status(500).json({message: result.message});
    }
})

export {router as itemRoutes}