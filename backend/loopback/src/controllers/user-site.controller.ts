/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {authenticate} from "@loopback/authentication";
import {Filter, repository} from "@loopback/repository";
import {get, getModelSchemaRef, param} from "@loopback/rest";
import {Site} from "../models";
import {UserRepository} from "../repositories";

@authenticate("jwt")
export class UserSiteController {
  constructor(@repository(UserRepository) protected userRepository: UserRepository) {}

  @get("/users/{id}/sites", {
    responses: {
      "200": {
        description: "Array of User has many Site",
        content: {
          "application/json": {
            schema: {type: "array", items: getModelSchemaRef(Site)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number("id") id: number,
    @param.query.object("filter") filter?: Filter<Site>
  ): Promise<Site[]> {
    return this.userRepository.sites(id).find(filter);
  }

  // @post("/users/{id}/sites", {
  //   responses: {
  //     "200": {
  //       description: "User model instance",
  //       content: {"application/json": {schema: getModelSchemaRef(Site)}},
  //     },
  //   },
  // })
  // async create(
  //   @param.path.number("id") id: typeof User.prototype.id,
  //   @requestBody({
  //     content: {
  //       "application/json": {
  //         schema: getModelSchemaRef(Site, {
  //           title: "NewSiteInUser",
  //           exclude: ["id"],
  //           optional: ["userId"],
  //         }),
  //       },
  //     },
  //   })
  //   site: Omit<Site, "id">
  // ): Promise<Site> {
  //   return this.userRepository.sites(id).create(site);
  // }

  // @patch("/users/{id}/sites", {
  //   responses: {
  //     "200": {
  //       description: "User.Site PATCH success count",
  //       content: {"application/json": {schema: CountSchema}},
  //     },
  //   },
  // })
  // async patch(
  //   @param.path.number("id") id: number,
  //   @requestBody({
  //     content: {
  //       "application/json": {
  //         schema: getModelSchemaRef(Site, {partial: true}),
  //       },
  //     },
  //   })
  //   site: Partial<Site>,
  //   @param.query.object("where", getWhereSchemaFor(Site)) where?: Where<Site>
  // ): Promise<Count> {
  //   return this.userRepository.sites(id).patch(site, where);
  // }

  // @del("/users/{id}/sites", {
  //   responses: {
  //     "200": {
  //       description: "User.Site DELETE success count",
  //       content: {"application/json": {schema: CountSchema}},
  //     },
  //   },
  // })
  // async delete(
  //   @param.path.number("id") id: number,
  //   @param.query.object("where", getWhereSchemaFor(Site)) where?: Where<Site>
  // ): Promise<Count> {
  //   return this.userRepository.sites(id).delete(where);
  // }
}
