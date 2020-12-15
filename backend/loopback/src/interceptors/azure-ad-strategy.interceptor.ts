/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {inject, Interceptor, InvocationContext, InvocationResult, Provider, ValueOrPromise} from "@loopback/core";
import {ExpressRequestHandler, toInterceptor} from "@loopback/rest";

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
//@globalInterceptor("middleware", {tags: {name: "AzureAdStrategy"}})
export class AzureAdStrategyInterceptor implements Provider<Interceptor> {
  constructor(
    @inject("azureAdStrategyExpressMiddleware")
    public azureAdStrategyExpressMiddleware: ExpressRequestHandler
  ) {}

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(invocationCtx: InvocationContext, next: () => ValueOrPromise<InvocationResult>) {
    return toInterceptor(this.azureAdStrategyExpressMiddleware)(invocationCtx, next);
  }
}
