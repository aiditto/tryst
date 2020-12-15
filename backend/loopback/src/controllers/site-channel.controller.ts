/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {authenticate} from "@loopback/authentication";
import {Count, CountSchema, Filter, repository, Where} from "@loopback/repository";
import {get, getModelSchemaRef, getWhereSchemaFor, param, patch, requestBody} from "@loopback/rest";
import {Channel} from "../models";
import {SiteRepository} from "../repositories";

export class SiteChannelController {
  constructor(@repository(SiteRepository) protected siteRepository: SiteRepository) {}

  @get("/sites/{id}/channels", {
    responses: {
      "200": {
        description: "Array of Site has many Channel",
        content: {
          "application/json": {
            schema: {type: "array", items: getModelSchemaRef(Channel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number("id") id: number,
    @param.query.object("filter") filter?: Filter<Channel>
  ): Promise<Channel[]> {
    return this.siteRepository.channels(id).find(filter);
  }

  @authenticate("jwt")
  @patch("/sites/{id}/channels", {
    responses: {
      "200": {
        description: "Site.Channel PATCH success count",
        content: {"application/json": {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Channel, {partial: true}),
        },
      },
    })
    channel: Partial<Channel>,
    @param.query.object("where", getWhereSchemaFor(Channel)) where?: Where<Channel>
  ): Promise<Count> {
    return this.siteRepository.channels(id).patch(channel, where);
  }

  /* Not needed with this Design Flow Work
  @post('/sites/{id}/channels', {
    responses: {
      '200': {
        description: 'Site model instance',
        content: {'application/json': {schema: getModelSchemaRef(Channel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Site.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Channel, {
            title: 'NewChannelInSite',
            exclude: ['id'],
            optional: ['siteId']
          }),
        },
      },
    }) channel: Omit<Channel, 'id'>,
  ): Promise<Channel> {
    return this.siteRepository.channels(id).create(channel);
  }

  @patch('/sites/{id}/channels', {
    responses: {
      '200': {
        description: 'Site.Channel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Channel, {partial: true}),
        },
      },
    })
    channel: Partial<Channel>,
    @param.query.object('where', getWhereSchemaFor(Channel)) where?: Where<Channel>,
  ): Promise<Count> {
    return this.siteRepository.channels(id).patch(channel, where);
  }

  @del('/sites/{id}/channels', {
    responses: {
      '200': {
        description: 'Site.Channel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Channel)) where?: Where<Channel>,
  ): Promise<Count> {
    return this.siteRepository.channels(id).delete(where);
  } */
}
