/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {/* inject, */ BindingScope, injectable} from "@loopback/core";
import {Count, Filter, FilterExcludingWhere, repository, Where} from "@loopback/repository";
import {Response} from "../models";
import {ResponseRepository} from "../repositories";

@injectable({scope: BindingScope.TRANSIENT})
export class ResponseService {
  constructor(
    @repository(ResponseRepository)
    public responseRepository: ResponseRepository
  ) {}
  async create(response: Omit<Response, "id">): Promise<Response> {
    return this.responseRepository.create(response);
  }

  async count(where?: Where<Response>): Promise<Count> {
    return this.responseRepository.count(where);
  }

  async find(filter?: Filter<Response>): Promise<Response[]> {
    return this.responseRepository.find(filter);
  }

  async updateAll(response: Response, where?: Where<Response>): Promise<Count> {
    return this.responseRepository.updateAll(response, where);
  }

  async findById(id: number, filter?: FilterExcludingWhere<Response>): Promise<Response> {
    return this.responseRepository.findById(id, filter);
  }

  async updateById(id: number, response: Response): Promise<void> {
    return this.responseRepository.updateById(id, response);
  }

  async replaceById(id: number, response: Response): Promise<void> {
    return this.responseRepository.replaceById(id, response);
  }

  async deleteById(id: number): Promise<void> {
    return this.responseRepository.deleteById(id);
  }
}
