/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {/* inject, */ BindingScope, injectable} from "@loopback/core";
import {Count, Filter, FilterExcludingWhere, repository, Where} from "@loopback/repository";
import {HttpErrors} from "@loopback/rest";
import {Site} from "../models";
import {SiteRepository} from "../repositories";

@injectable({scope: BindingScope.TRANSIENT})
export class SiteService {
  constructor(
    @repository(SiteRepository)
    public siteRepository: SiteRepository
  ) {}

  async create(site: Omit<Site, "id">): Promise<Site> {
    const existingSite = await this.siteRepository.find({
      where: {identifier: site.identifier},
    });
    if (existingSite && existingSite.length > 0) {
      throw new HttpErrors.BadRequest("Resource already exist.");
    }
    return this.siteRepository.create(site);
  }

  async count(where?: Where<Site>): Promise<Count> {
    return this.siteRepository.count(where);
  }

  async find(filter?: Filter<Site>): Promise<Site[]> {
    return this.siteRepository.find(filter);
  }

  async updateAll(site: Site, where?: Where<Site>): Promise<Count> {
    return this.siteRepository.updateAll(site, where);
  }

  async findById(id: number, filter?: FilterExcludingWhere<Site>): Promise<Site> {
    return this.siteRepository.findById(id, filter);
  }

  async updateById(id: number, site: Site): Promise<void> {
    return this.siteRepository.updateById(id, site);
  }

  async replaceById(id: number, site: Site): Promise<void> {
    return this.siteRepository.replaceById(id, site);
  }

  async deleteById(id: number): Promise<void> {
    return this.siteRepository.deleteById(id);
  }
}
