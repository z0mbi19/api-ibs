import { Router } from "express";
import ProfessionsController from "./app/controllers/ProfessionsController";
import UserController from "./app/controllers/UsersController";

const router = Router();

//get User
router.get("/user/:id", UserController.index);
router.get("/user/", UserController.indexAll);

//post User
router.post("/user", UserController.store);

//put User
router.put("/user/:id", UserController.update);

//delet user
router.delete("/user/:id", UserController.delete);

//getprofessions
router.get("/profession/", ProfessionsController.indexAll);
router.get("/profession/:id", ProfessionsController.index);

//post professions
router.post("/profession", ProfessionsController.store);

//path professions
router.patch("/profession/:id", ProfessionsController.update);

//delete professions
router.delete("/profession/:id", ProfessionsController.delete);

export default router;
