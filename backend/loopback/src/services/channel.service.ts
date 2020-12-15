/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {/* inject, */ BindingScope, injectable} from "@loopback/core";
import {Count, Filter, FilterExcludingWhere, repository, Where} from "@loopback/repository";
import {HttpErrors} from "@loopback/rest";
import {Channel} from "../models";
import {ChannelRepository} from "../repositories";

@injectable({scope: BindingScope.TRANSIENT})
export class ChannelService {
  constructor(
    @repository(ChannelRepository)
    public channelRepository: ChannelRepository
  ) {}

  async create(channel: Omit<Channel, "id">): Promise<Channel> {
    const existingChannel = await this.channelRepository.find({
      where: {identifier: channel.identifier},
    });
    if (existingChannel && existingChannel.length > 0) {
      throw new HttpErrors.BadRequest("Resource already exist.");
    }
    return this.channelRepository.create(channel);
  }

  async count(where?: Where<Channel>): Promise<Count> {
    return this.channelRepository.count(where);
  }

  async find(filter?: Filter<Channel>): Promise<Channel[]> {
    return this.channelRepository.find(filter);
  }

  async updateAll(channel: Channel, where?: Where<Channel>): Promise<Count> {
    return this.channelRepository.updateAll(channel, where);
  }

  async findById(id: number, filter?: FilterExcludingWhere<Channel>): Promise<Channel> {
    return this.channelRepository.findById(id, filter);
  }

  async updateById(id: number, channel: Channel): Promise<void> {
    return this.channelRepository.updateById(id, channel);
  }

  async replaceById(id: number, channel: Channel): Promise<void> {
    return this.channelRepository.replaceById(id, channel);
  }

  async deleteById(id: number): Promise<void> {
    return this.channelRepository.deleteById(id);
  }
}
