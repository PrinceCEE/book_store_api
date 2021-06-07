class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = HttpError.name;
    this.statusCode = statusCode;
  }
}

export class UnAuthorizedError extends HttpError {
  constructor(message) {
    if(!message) {
      message = "Unauthorized access";
    }
    super(message, 401);
    this.name = UnAuthorizedError.name;
  }
}

export class BadRequestError extends HttpError {
  constructor(message) {
    if(!message) {
      message = "Bad request";
    }
    super(message, 400);
    this.name = BadRequestError.name;
  }
}

export class InternalServerError extends HttpError {
  constructor(message) {
    if(!message) {
      message = "Internal server error";
    }
    super(message, 500);
    this.name = InternalServerError.name;
  }
}

export class NotFoundError extends HttpError {
  constructor(message) {
    if(!message) {
      message = "Not found";
    }
    super(message, 404);
    this.name = NotFoundError.name;
  }
}