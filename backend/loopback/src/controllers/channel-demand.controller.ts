/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Count, CountSchema, Filter, repository, Where} from "@loopback/repository";
import {get, getModelSchemaRef, getWhereSchemaFor, param, patch, requestBody} from "@loopback/rest";
import {Demand} from "../models";
import {ChannelRepository} from "../repositories";

export class ChannelDemandController {
  constructor(@repository(ChannelRepository) protected channelRepository: ChannelRepository) {}

  @get("/channels/{id}/demands", {
    responses: {
      "200": {
        description: "Array of Channel has many Demand",
        content: {
          "application/json": {
            schema: {type: "array", items: getModelSchemaRef(Demand)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number("id") id: number,
    @param.query.object("filter") filter?: Filter<Demand>
  ): Promise<Demand[]> {
    return this.channelRepository.demands(id).find(filter);
  }

  @patch("/channels/{id}/demands", {
    responses: {
      "200": {
        description: "Channel.Demand PATCH success count",
        content: {"application/json": {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Demand, {partial: true}),
        },
      },
    })
    demand: Partial<Demand>,
    @param.query.object("where", getWhereSchemaFor(Demand)) where?: Where<Demand>
  ): Promise<Count> {
    return this.channelRepository.demands(id).patch(demand, where);
  }

  /* No needed with this design
  @post("/channels/{id}/demands", {
    responses: {
      "200": {
        description: "Channel model instance",
        content: {"application/json": {schema: getModelSchemaRef(Demand)}},
      },
    },
  })
  async create(
    @param.path.number("id") id: typeof Channel.prototype.id,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Demand, {
            title: "NewDemandInChannel",
            exclude: ["id"],
            optional: ["channelId"],
          }),
        },
      },
    })
    demand: Omit<Demand, "id">
  ): Promise<Demand> {
    return this.channelRepository.demands(id).create(demand);
  }

  @del("/channels/{id}/demands", {
    responses: {
      "200": {
        description: "Channel.Demand DELETE success count",
        content: {"application/json": {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number("id") id: number,
    @param.query.object("where", getWhereSchemaFor(Demand)) where?: Where<Demand>
  ): Promise<Count> {
    return this.channelRepository.demands(id).delete(where);
  } */
}
