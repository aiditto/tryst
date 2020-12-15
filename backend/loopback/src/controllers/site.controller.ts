/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {authenticate} from "@loopback/authentication";
import {service} from "@loopback/core";
import {Count, CountSchema, Filter, FilterExcludingWhere, Where} from "@loopback/repository";
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from "@loopback/rest";
import {Site} from "../models";
import {SiteService} from "../services";

@authenticate("jwt")
export class SiteController {
  constructor(
    @service(SiteService)
    public siteService: SiteService
  ) {}

  @post("/sites", {
    responses: {
      "201": {
        description: "Site model instance",
        content: {"application/json": {schema: getModelSchemaRef(Site)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Site, {
            title: "NewSite",
            exclude: ["id"],
          }),
        },
      },
    })
    site: Omit<Site, "id">
  ): Promise<Site> {
    return this.siteService.create(site);
  }

  @authenticate.skip()
  @get("/sites/count", {
    responses: {
      "200": {
        description: "Site model count",
        content: {"application/json": {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Site) where?: Where<Site>): Promise<Count> {
    return this.siteService.count(where);
  }

  @authenticate.skip()
  @get("/sites", {
    responses: {
      "200": {
        description: "Array of Site model instances",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: getModelSchemaRef(Site, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Site) filter?: Filter<Site>): Promise<Site[]> {
    return this.siteService.find(filter);
  }

  @patch("/sites", {
    responses: {
      "200": {
        description: "Site PATCH success count",
        content: {"application/json": {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Site, {partial: true}),
        },
      },
    })
    site: Site,
    @param.where(Site) where?: Where<Site>
  ): Promise<Count> {
    return this.siteService.updateAll(site, where);
  }

  @authenticate.skip()
  @get("/sites/{id}", {
    responses: {
      "200": {
        description: "Site model instance",
        content: {
          "application/json": {
            schema: getModelSchemaRef(Site, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number("id") id: number,
    @param.filter(Site, {exclude: "where"}) filter?: FilterExcludingWhere<Site>
  ): Promise<Site> {
    return this.siteService.findById(id, filter);
  }

  @patch("/sites/{id}", {
    responses: {
      "204": {
        description: "Site PATCH success",
      },
    },
  })
  async updateById(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Site, {partial: true}),
        },
      },
    })
    site: Site
  ): Promise<void> {
    await this.siteService.updateById(id, site);
  }

  @put("/sites/{id}", {
    responses: {
      "204": {
        description: "Site PUT success",
      },
    },
  })
  async replaceById(@param.path.number("id") id: number, @requestBody() site: Site): Promise<void> {
    await this.siteService.replaceById(id, site);
  }

  @del("/sites/{id}", {
    responses: {
      "204": {
        description: "Site DELETE success",
      },
    },
  })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
    await this.siteService.deleteById(id);
  }
}
