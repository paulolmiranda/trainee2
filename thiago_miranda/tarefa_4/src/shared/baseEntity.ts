import { v4 as uuidv4 } from "uuid";

export abstract class BaseEntity {
  id: string;

  constructor(partial?: Partial<BaseEntity>) {
    this.id = partial?.id || uuidv4();
  }
}
