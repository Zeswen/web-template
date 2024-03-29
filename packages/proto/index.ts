import type { AuthorizationServiceClient } from './authorization/authorization'
import type { PaymentServiceClient } from './payment/payment'
import type { ProductServiceClient } from './product/product'

type NonNullableValues<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}
type Last<T extends any[]> = T extends [...infer _I, infer L] ? L : never

type GrpcClient = AuthorizationServiceClient &
  PaymentServiceClient &
  ProductServiceClient

type GrpcMethod = GrpcClient[keyof GrpcClient] &
  ((request: any, callback: (...args: any[]) => any) => any)

export const grpcRequest = <T extends GrpcMethod>(
  grpcMethod: T,
  grpcRequest: Parameters<T>[0]
) => {
  type GrpcMethodCallback = Last<Parameters<T>>
  type GrpcMethodResponse = Parameters<GrpcMethodCallback>[1]

  return new Promise<NonNullableValues<GrpcMethodResponse>>((resolve, reject) =>
    grpcMethod(grpcRequest, (error, response) => {
      if (error) return reject(error)
      return resolve(response)
    })
  )
}
