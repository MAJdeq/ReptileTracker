import { PrismaClient } from "@prisma/client";

export type CreateReptilePayload = {
  species: string;
  name: string;
  sex: string;
  userId: number; // Assuming userId will be provided
};

export class ReptilesRepository {
  private db: PrismaClient;
  private static instance: ReptilesRepository;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): ReptilesRepository {
    if (!this.instance) {
      this.instance = new ReptilesRepository(db!!);
    }
    return this.instance;
  }

  async createReptile({ species, name, sex, userId }: CreateReptilePayload) {
    return this.db.reptile.create({
      data: {
        species,
        name,
        sex,
        userId,
      },
    });
  }

  async getReptilesByUserId(userId: number) {
    return this.db.reptile.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
