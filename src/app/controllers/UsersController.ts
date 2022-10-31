import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Profession from "../models/Profession";
import User from "../models/User";

class UserController {
  async index(req: Request, res: Response) {
    const repository = await getRepository(User)
      .createQueryBuilder("professions")
      .leftJoinAndSelect("professions.IdProfession", "users")
      .getMany();
    //const User = await repository.find({ where: { id: req.params.id } })
    return res.send(repository.filter((p) => p.id === Number(req.params.id)));
  }
  async indexAll(req: Request, res: Response) {
    const repository = await getRepository(User)
      .createQueryBuilder("professions")
      .leftJoinAndSelect("professions.IdProfession", "users")
      .getMany();
    //const User = await repository.find({ where: { id: req.params.id } })
    return res.send(repository);
  }
  async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const profession = getRepository(Profession);
    const { name, phone, email, IdProfession } = req.body;
    const professionExists = await profession.findOne({
      where: { id: IdProfession },
    });

    if (!professionExists) {
      return res.status(409).send("This Profession dont exist");
    }
    try {
      const User = repository.create({ name, phone, email, IdProfession });
      await repository.save(User);
      return res.json("ok");
    } catch (e) {
      return res.status(400).send(e);
    }
  }
  async update(req: Request, res: Response) {
    const repository = getRepository(User);
    const profession = getRepository(Profession);
    const { name, phone, email, IdProfession } = req.body;
    const professionExists = await profession.findOne({
      where: { id: IdProfession },
    });
    const users = await repository.findOne({ where: { id: req.params.id } });
    if (!users) {
      return res.status(409).send("This user dont exist");
    }
    if (!professionExists) {
      return res.status(409).send("This Profession dont exist");
    }
    try {
      await repository.save({ id: users.id, name, phone, email, IdProfession });
      return res.json("ok");
    } catch (e) {
      return res.json(400).send(e);
    }
  }
  async delete(req: Request, res: Response) {
    const repository = getRepository(User);
    const users = await repository.findOne({ where: { id: req.params.id } });
    if (!users) {
      return res.status(409).send("This user dont exist");
    }
    await repository.delete({ id: users.id });
    return res.json("ok");
  }
}

export default new UserController();
