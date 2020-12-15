/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Entity, model, property} from "@loopback/repository";

@model({settings: {strict: false}})
export class Response extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: "array",
    itemType: "string",
  })
  requirements?: string[];

  @property({
    type: "array",
    itemType: "string",
  })
  models?: string[];

  @property({
    type: "object",
    required: true,
  })
  details: object;

  @property({
    type: "date",
    default: "$now",
  })
  createdAt?: string;

  @property({
    type: "number",
    required: true,
  })
  demandId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Response>) {
    super(data);
  }
}

export interface ResponseRelations {
  // describe navigational properties here
}

export type ResponseWithRelations = Response & ResponseRelations;
