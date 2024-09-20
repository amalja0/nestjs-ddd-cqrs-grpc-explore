import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { AccountEssentialProperties, AccountProperties, IAccount } from '../../domain/domain/account.domain';
import { AccountFactory } from "../../domain/Factory/account.factory";
import { AccountRepository } from "../../domain/repository/account.repository";
import { AuthEntity } from '../entity/auth.entity';

export class AccountRepositoryImpl implements AccountRepository {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly accountFactory: AccountFactory
  ){}

  async save(data: IAccount): Promise<AccountEssentialProperties> {
    const entity = this.modelToEntity(data);
    const user = await this.entityManager.getRepository(AuthEntity).save(entity);

    return user as AccountEssentialProperties;
  }

  private modelToEntity(model: IAccount): AuthEntity {
    const props = JSON.parse(JSON.stringify(model)) as AccountProperties;
    return {
      ...props,
      isAdmin: true,
      isActive: true
    }
  }

  private entityToModel(entity: AuthEntity): IAccount {
    return this.accountFactory.reconstitute({
      ...entity
    })
  }
}