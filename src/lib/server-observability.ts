type RequestObservationContext = {
  route: string;
  method: string;
  requestId: string | null;
};

function errorMessage(error: unknown) {
  if (error instanceof Error) return error.message.slice(0, 240);
  return "Unknown server error";
}

function logStart(context: RequestObservationContext) {
  console.log(JSON.stringify({
    level: "info",
    msg: "start",
    ...context,
  }));
}

function logDone(
  context: RequestObservationContext,
  startedAt: number,
  status: number,
) {
  console.log(JSON.stringify({
    level: "info",
    msg: "done",
    ...context,
    status,
    ms: Date.now() - startedAt,
  }));
}

function logFailure(
  context: RequestObservationContext,
  startedAt: number,
  error: unknown,
) {
  console.error(JSON.stringify({
    level: "error",
    msg: "failed",
    ...context,
    error: errorMessage(error),
    ms: Date.now() - startedAt,
  }));
}

export async function observeRequest<T extends Response>(
  request: Request,
  route: string,
  handler: () => Promise<T> | T,
): Promise<T> {
  const startedAt = Date.now();
  const context: RequestObservationContext = {
    route,
    method: request.method,
    requestId: request.headers.get("x-vercel-id"),
  };

  logStart(context);

  try {
    const response = await handler();
    logDone(context, startedAt, response.status);
    return response;
  } catch (error) {
    logFailure(context, startedAt, error);
    throw error;
  }
}

export function startServerActionObservation(action: string) {
  const startedAt = Date.now();

  console.log(JSON.stringify({
    level: "info",
    msg: "start",
    action,
  }));

  return {
    done(outcome = "ok") {
      console.log(JSON.stringify({
        level: "info",
        msg: "done",
        action,
        outcome,
        ms: Date.now() - startedAt,
      }));
    },
    failed(error: unknown) {
      console.error(JSON.stringify({
        level: "error",
        msg: "failed",
        action,
        error: errorMessage(error),
        ms: Date.now() - startedAt,
      }));
    },
  };
}
