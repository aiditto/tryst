/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {BindingScope, injectable} from "@loopback/core";
import {Count, Filter, FilterExcludingWhere, repository, Where} from "@loopback/repository";
import {HttpErrors} from "@loopback/rest";
import {Demand} from "../models";
import {DemandRepository} from "../repositories";

@injectable({scope: BindingScope.TRANSIENT})
export class DemandService {
  constructor(
    @repository(DemandRepository)
    public demandRepository: DemandRepository
  ) {}

  async create(demand: Omit<Demand, "id">): Promise<Demand> {
    const existingDemand = await this.demandRepository.find({
      where: {identifier: demand.identifier},
    });
    if (existingDemand && existingDemand.length > 0) {
      throw new HttpErrors.BadRequest("Resource already exist.");
    }
    return this.demandRepository.create(demand);
  }

  async count(where?: Where<Demand>): Promise<Count> {
    return this.demandRepository.count(where);
  }

  async find(filter?: Filter<Demand>): Promise<Demand[]> {
    return this.demandRepository.find(filter);
  }

  async updateAll(demand: Demand, where?: Where<Demand>): Promise<Count> {
    return this.demandRepository.updateAll(demand, where);
  }

  async findById(id: number, filter?: FilterExcludingWhere<Demand>): Promise<Demand> {
    return this.demandRepository.findById(id, filter);
  }

  async updateById(id: number, demand: Demand): Promise<void> {
    return this.demandRepository.updateById(id, demand);
  }

  async replaceById(id: number, demand: Demand): Promise<void> {
    return this.demandRepository.replaceById(id, demand);
  }

  async deleteById(id: number): Promise<void> {
    return this.demandRepository.deleteById(id);
  }
}
