/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {authenticate} from "@loopback/authentication";
import {service} from "@loopback/core";
import {Count, CountSchema, Filter, FilterExcludingWhere, Where} from "@loopback/repository";
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from "@loopback/rest";
import {Channel} from "../models";
import {ChannelService} from "../services";

@authenticate("jwt")
export class ChannelController {
  constructor(
    @service(ChannelService)
    public channelService: ChannelService
  ) {}

  @post("/channels", {
    responses: {
      "200": {
        description: "Channel model instance",
        content: {"application/json": {schema: getModelSchemaRef(Channel)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Channel, {
            title: "NewChannel",
            exclude: ["id"],
          }),
        },
      },
    })
    channel: Omit<Channel, "id">
  ): Promise<Channel> {
    return this.channelService.create(channel);
  }

  @authenticate.skip()
  @get("/channels/count", {
    responses: {
      "200": {
        description: "Channel model count",
        content: {"application/json": {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Channel) where?: Where<Channel>): Promise<Count> {
    return this.channelService.count(where);
  }

  @authenticate.skip()
  @get("/channels", {
    responses: {
      "200": {
        description: "Array of Channel model instances",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: getModelSchemaRef(Channel, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Channel) filter?: Filter<Channel>): Promise<Channel[]> {
    return this.channelService.find(filter);
  }

  @patch("/channels", {
    responses: {
      "200": {
        description: "Channel PATCH success count",
        content: {"application/json": {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Channel, {partial: true}),
        },
      },
    })
    channel: Channel,
    @param.where(Channel) where?: Where<Channel>
  ): Promise<Count> {
    return this.channelService.updateAll(channel, where);
  }

  @authenticate.skip()
  @get("/channels/{id}", {
    responses: {
      "200": {
        description: "Channel model instance",
        content: {
          "application/json": {
            schema: getModelSchemaRef(Channel, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number("id") id: number,
    @param.filter(Channel, {exclude: "where"}) filter?: FilterExcludingWhere<Channel>
  ): Promise<Channel> {
    return this.channelService.findById(id, filter);
  }

  @patch("/channels/{id}", {
    responses: {
      "204": {
        description: "Channel PATCH success",
      },
    },
  })
  async updateById(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Channel, {partial: true}),
        },
      },
    })
    channel: Channel
  ): Promise<void> {
    await this.channelService.updateById(id, channel);
  }

  @put("/channels/{id}", {
    responses: {
      "204": {
        description: "Channel PUT success",
      },
    },
  })
  async replaceById(@param.path.number("id") id: number, @requestBody() channel: Channel): Promise<void> {
    await this.channelService.replaceById(id, channel);
  }

  @del("/channels/{id}", {
    responses: {
      "204": {
        description: "Channel DELETE success",
      },
    },
  })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
    await this.channelService.deleteById(id);
  }
}
