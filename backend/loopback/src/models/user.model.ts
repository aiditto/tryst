/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Entity, hasMany, model, property} from "@loopback/repository";
import {Site} from "./site.model";

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: "string",
    required: true,
  })
  oid: string;

  @property({
    type: "string",
    required: true,
  })
  email: string;

  @property({
    type: "string",
  })
  role?: string;

  @property({
    type: "date",
    default: "$now",
  })
  createdAt?: string;

  @property({
    type: "date",
    default: "$now",
  })
  lastModified?: string;

  @hasMany(() => Site, {keyTo: "userId"})
  sites: Site[];

  @property({
    type: "number",
  })
  siteId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
