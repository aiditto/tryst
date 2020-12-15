/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Entity, hasMany, model, property} from "@loopback/repository";
import {Response} from "./response.model";
import {ExternalSetting, FormSection, HeaderSection, ListSection, TextSection} from "./types";

@model({settings: {strict: false}})
export class Demand extends Entity {
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
  externalSetting?: ExternalSetting;

  @property({
    type: "object",
    nullable: true,
  })
  listSection?: ListSection;

  @property({
    type: "object",
    nullable: true,
  })
  formSection?: FormSection;

  @property({
    type: "object",
    default: null,
    nullable: true,
  })
  thankyouSection?: TextSection;

  @property({
    type: "number",
    required: true,
  })
  channelId: number;

  @property({
    type: "string",
  })
  status?: string;

  @hasMany(() => Response, {keyTo: "demandId"})
  responses: Response[];

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Demand>) {
    super(data);
  }
}

export interface DemandRelations {
  // describe navigational properties here
}

export type DemandWithRelations = Demand & DemandRelations;
