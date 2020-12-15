/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {authenticate} from "@loopback/authentication";
import {Count, CountSchema, Filter, repository, Where} from "@loopback/repository";
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from "@loopback/rest";
import {Site, User} from "../models";
import {SiteRepository} from "../repositories";

@authenticate("jwt")
export class SiteUserController {
  constructor(@repository(SiteRepository) protected siteRepository: SiteRepository) {}

  @get("/sites/{id}/users", {
    responses: {
      "200": {
        description: "Array of Site has many User",
        content: {
          "application/json": {
            schema: {type: "array", items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number("id") id: number,
    @param.query.object("filter") filter?: Filter<User>
  ): Promise<User[]> {
    return this.siteRepository.users(id).find(filter);
  }

  @post("/sites/{id}/users", {
    responses: {
      "200": {
        description: "Site model instance",
        content: {"application/json": {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.number("id") id: typeof Site.prototype.id,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(User, {
            title: "NewUserInSite",
            exclude: ["id"],
            optional: ["siteId"],
          }),
        },
      },
    })
    user: Omit<User, "id">
  ): Promise<User> {
    return this.siteRepository.users(id).create(user);
  }

  @patch("/sites/{id}/users", {
    responses: {
      "200": {
        description: "Site.User PATCH success count",
        content: {"application/json": {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object("where", getWhereSchemaFor(User)) where?: Where<User>
  ): Promise<Count> {
    return this.siteRepository.users(id).patch(user, where);
  }

  @del("/sites/{id}/users", {
    responses: {
      "200": {
        description: "Site.User DELETE success count",
        content: {"application/json": {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number("id") id: number,
    @param.query.object("where", getWhereSchemaFor(User)) where?: Where<User>
  ): Promise<Count> {
    return this.siteRepository.users(id).delete(where);
  }
}
