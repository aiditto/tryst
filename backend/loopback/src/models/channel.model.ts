/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Entity, hasMany, model, property} from "@loopback/repository";
import {Demand} from "./demand.model";
import {ExternalSetting, HeaderSection, TextSection} from "./types";

@model({settings: {strict: false}})
export class Channel extends Entity {
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
  identifier: string;

  @property({
    type: "string",
    required: true,
  })
  name: string;

  @property({
    type: "string",
  })
  description?: string;

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
  externalSetting?: ExternalSetting;

  @property({
    type: "number",
    required: true,
  })
  siteId: number;

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

  @hasMany(() => Demand, {keyTo: "channelId"})
  demands: Demand[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Channel>) {
    super(data);
  }
}

export interface ChannelRelations {
  // describe navigational properties here
}

export type ChannelWithRelations = Channel & ChannelRelations;
