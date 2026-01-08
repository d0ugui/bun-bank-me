import type { BunRequest } from "bun"
import type { IController } from "../../application/interfaces/IController"

export function routeAdapter(controller: IController) {
  return async (req: BunRequest) => {
    const { statusCode, body } = await controller.handle({
      params: req.params,
      body: await req.body?.json(),
      headers: Object.fromEntries(req.headers.entries()),
    })

    return Response.json({ status: statusCode, body })
  }
}
