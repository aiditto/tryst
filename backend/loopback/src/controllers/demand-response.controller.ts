/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {authenticate} from "@loopback/authentication";
import {Filter, repository} from "@loopback/repository";
import {get, getModelSchemaRef, param} from "@loopback/rest";
import {Response} from "../models";
import {DemandRepository} from "../repositories";

@authenticate("jwt")
export class DemandResponseController {
  constructor(@repository(DemandRepository) protected demandRepository: DemandRepository) {}

  @get("/demands/{id}/responses", {
    responses: {
      "200": {
        description: "Array of Demand has many Response",
        content: {
          "application/json": {
            schema: {type: "array", items: getModelSchemaRef(Response)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number("id") id: number,
    @param.query.object("filter") filter?: Filter<Response>
  ): Promise<Response[]> {
    return this.demandRepository.responses(id).find(filter);
  }

  // @post('/demands/{id}/responses', {
  //   responses: {
  //     '200': {
  //       description: 'Demand model instance',
  //       content: {'application/json': {schema: getModelSchemaRef(Response)}},
  //     },
  //   },
  // })
  // async create(
  //   @param.path.number('id') id: typeof Demand.prototype.id,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Response, {
  //           title: 'NewResponseInDemand',
  //           exclude: ['id'],
  //           optional: ['demandId']
  //         }),
  //       },
  //     },
  //   }) response: Omit<Response, 'id'>,
  // ): Promise<Response> {
  //   return this.demandRepository.responses(id).create(response);
  // }

  // @patch('/demands/{id}/responses', {
  //   responses: {
  //     '200': {
  //       description: 'Demand.Response PATCH success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async patch(
  //   @param.path.number('id') id: number,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Response, {partial: true}),
  //       },
  //     },
  //   })
  //   response: Partial<Response>,
  //   @param.query.object('where', getWhereSchemaFor(Response)) where?: Where<Response>,
  // ): Promise<Count> {
  //   return this.demandRepository.responses(id).patch(response, where);
  // }

  // @del('/demands/{id}/responses', {
  //   responses: {
  //     '200': {
  //       description: 'Demand.Response DELETE success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async delete(
  //   @param.path.number('id') id: number,
  //   @param.query.object('where', getWhereSchemaFor(Response)) where?: Where<Response>,
  // ): Promise<Count> {
  //   return this.demandRepository.responses(id).delete(where);
  // }
}
