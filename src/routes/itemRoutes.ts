import { Request, Response, NextFunction, Router } from "express";
import ItemService from "../Services/itemService";
// import models
import { Item } from "../models/itemModel";
import { ImageModel } from "../models/imageModel";
// import auth
import { validateToken } from "./authRoutes";
// muter to upload files
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();
export { router as itemRoutes };

const itemService = new ItemService(Item);

router.get("/", async (req, res) => {
  const { success, result } = await itemService.get();
  if (success) {
    res.status(200).json(result);
  } else {
    res.status(500).json({ message: result.message });
  }
});

router.get("/:id", validateToken, async (req, res) => {
  const { success, result } = await itemService.getById(req.params.id);
  if (success) {
    if (!result) res.status(404).json({ message: "item not found" });
    else res.status(200).json(result);
  } else {
    res.status(500).json({ message: result.message });
  }
});

router.post("/", async (req, res) => {
  const { success, result } = await itemService.add(req.body);
  if (success) {
    res.status(201).json(result);
  } else {
    res.status(500).json({ message: result.message });
  }
});

router.put("/:id", async (req, res) => {
  const { success, result } = await itemService.edit(req.params.id, req.body);
  if (success) {
    if (!result) res.status(404).json({ message: "item not found" });
    res.status(200).json(result);
  } else {
    res.status(500).json({ message: result.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { success, result } = await itemService.remove(req.params.id);
  if (success) {
    res.status(200).json(result);
  } else {
    res.status(500).json({ message: result.message });
  }
});

// router.post("/uploadfile", upload.single("image"), async (req, res) => {
//   // mime type
//   // const type = mime.lookup(path);
//   const image = new ImageModel();
//   image.img.data = req.file.buffer;
//   image.img.contentType = "image/png";
//   image.name = req.body.name;
//   image.desc = req.body.desc;

//   try {
//     const result = await image.save();
//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

// router.get("/getImage", async (req, res) => {
//   const a = "";
//   const result = ImageModel.find((err, doc) => {
//     if (err) return res.status(500).json({ message: err.message });
//     res.contentType(doc[0].img.contentType);
//     res.send(doc[0].img.data);
//   });
// });
