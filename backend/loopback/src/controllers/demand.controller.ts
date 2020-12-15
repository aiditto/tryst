/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {authenticate} from "@loopback/authentication";
import {service} from "@loopback/core";
import {Count, CountSchema, Filter, FilterExcludingWhere, Where} from "@loopback/repository";
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from "@loopback/rest";
import {Demand} from "../models";
import {DemandService} from "../services";

@authenticate("jwt")
export class DemandController {
  constructor(
    @service(DemandService)
    public demandService: DemandService
  ) {}

  @post("/demands", {
    responses: {
      "200": {
        description: "Demand model instance",
        content: {"application/json": {schema: getModelSchemaRef(Demand)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Demand, {
            title: "NewDemand",
            exclude: ["id"],
          }),
        },
      },
    })
    demand: Omit<Demand, "id">
  ): Promise<Demand> {
    return this.demandService.create(demand);
  }

  @authenticate.skip()
  @get("/demands/count", {
    responses: {
      "200": {
        description: "Demand model count",
        content: {"application/json": {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Demand) where?: Where<Demand>): Promise<Count> {
    return this.demandService.count(where);
  }

  @authenticate.skip()
  @get("/demands", {
    responses: {
      "200": {
        description: "Array of Demand model instances",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: getModelSchemaRef(Demand, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Demand) filter?: Filter<Demand>): Promise<Demand[]> {
    return this.demandService.find(filter);
  }

  @patch("/demands", {
    responses: {
      "200": {
        description: "Demand PATCH success count",
        content: {"application/json": {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Demand, {partial: true}),
        },
      },
    })
    demand: Demand,
    @param.where(Demand) where?: Where<Demand>
  ): Promise<Count> {
    return this.demandService.updateAll(demand, where);
  }

  @authenticate.skip()
  @get("/demands/{id}", {
    responses: {
      "200": {
        description: "Demand model instance",
        content: {
          "application/json": {
            schema: getModelSchemaRef(Demand, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number("id") id: number,
    @param.filter(Demand, {exclude: "where"}) filter?: FilterExcludingWhere<Demand>
  ): Promise<Demand> {
    return this.demandService.findById(id, filter);
  }

  @patch("/demands/{id}", {
    responses: {
      "204": {
        description: "Demand PATCH success",
      },
    },
  })
  async updateById(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Demand, {partial: true}),
        },
      },
    })
    demand: Demand
  ): Promise<void> {
    await this.demandService.updateById(id, demand);
  }

  @put("/demands/{id}", {
    responses: {
      "204": {
        description: "Demand PUT success",
      },
    },
  })
  async replaceById(@param.path.number("id") id: number, @requestBody() demand: Demand): Promise<void> {
    await this.demandService.replaceById(id, demand);
  }

  @del("/demands/{id}", {
    responses: {
      "204": {
        description: "Demand DELETE success",
      },
    },
  })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
    await this.demandService.deleteById(id);
  }
}
