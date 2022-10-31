import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Profession from "../models/Profession";

class ProfessionController {
  async index(req: Request, res: Response) {
    const repository = getRepository(Profession);
    const profession = await repository.find({ where: { id: req.params.id } });
    return res.send(profession);
  }

  async indexAll(req: Request, res: Response) {
    const repository = getRepository(Profession);
    const profession = await repository.find();
    return res.send(profession);
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(Profession);
    const { name } = req.body;
    const userExists = await repository.findOne({ where: { name } });
    if (userExists) {
      return res.status(409).send("This profession is alread create");
    }
    const categorie = repository.create({ name });
    await repository.save(categorie);
    return res.json("ok");
  }

  async update(req: Request, res: Response) {
    const repository = getRepository(Profession);
    const { name } = req.body;
    const categorieExists = await repository.findOne({
      where: { id: req.params.id },
    });
    if (!categorieExists) {
      return res.status(409).send("Profession dont exist");
    }
    await repository.save({ id: categorieExists.id, name });
    return res.json("ok");
  }

  async delete(req: Request, res: Response) {
    const repository = getRepository(Profession);
    const categorieExists = await repository.findOne({
      where: { id: req.params.id },
    });
    if (!categorieExists) {
      return res.status(409).send("Profession dont exist");
    }
    await repository.delete({ id: categorieExists.id });
    return res.json("ok");
  }
}

export default new ProfessionController();
