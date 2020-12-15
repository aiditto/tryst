/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Entity, hasMany, model, property} from "@loopback/repository";
import {Channel} from "./channel.model";
import {AboutusSection, HeaderSection, Settings, TextSection} from "./types";
import {User} from "./user.model";

@model({settings: {strict: false}})
export class Site extends Entity {
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
  name: string;

  @property({
    type: "string",
    required: true,
  })
  identifier: string;

  @property({
    type: "object",
    nullable: true,
  })
  headerSection?: HeaderSection;

  @property({
    type: "object",
    nullable: true,
  })
  textSection?: TextSection;

  @property({
    type: "object",
    nullable: true,
  })
  buttonSection?: TextSection;

  @property({
    type: "object",
    nullable: true,
  })
  aboutusSection?: AboutusSection;

  @property({
    type: "number",
    required: true,
  })
  userId: number;

  @property({
    type: "string",
  })
  status?: string;

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

  @property({
    type: "object",
    nullable: true,
  })
  settings?: Settings;

  @hasMany(() => Channel, {keyTo: "siteId"})
  channels: Channel[];

  @hasMany(() => User, {keyTo: "siteId"})
  users: User[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Site>) {
    super(data);
  }
}

export interface SiteRelations {
  // describe navigational properties here
}

export type SiteWithRelations = Site & SiteRelations;
