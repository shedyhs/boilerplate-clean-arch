export namespace ApplicationErrors {
  export class NotFoundError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'NotFoundError';
    }
  }

  export class UnauthorizedError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'UnauthorizedError';
    }
  }

  export class PaymentRequired extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'PaymentRequired';
    }
  }

  export class ForbiddenError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'UnauthorizedError';
    }
  }

  export class MethodNotAllowed extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'MethodNotAllowed';
    }
  }
  export class NotAcceptable extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'NotAcceptable';
    }
  }

  export class ProxyAuthenticationRequired extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'ProxyAuthenticationRequired';
    }
  }

  export class RequestTimeout extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'RequestTimeout';
    }
  }

  export class ConflictError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'ConflictError';
    }
  }

  export class Gone extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'Gone';
    }
  }

  export class LengthRequired extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'LengthRequired';
    }
  }

  export class PreconditionFailed extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'PreconditionFailed';
    }
  }

  export class PayloadTooLarge extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'PayloadTooLarge';
    }
  }

  export class RequestURITooLarge extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'RequestURITooLarge';
    }
  }

  export class UnsupportedMediaType extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'UnsupportedMediaType';
    }
  }

  export class RequestRangeNotSatisfiable extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'RequestRangeNotSatisfiable';
    }
  }

  export class ExpectationFailed extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'ExpectationFailed';
    }
  }

  export class ImATeapot extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'ExpectationFailed';
    }
  }

  export class MisdirectedRequest extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'MisdirectedRequest';
    }
  }

  export class UnprocessableEntity extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'UnprocessableEntity';
    }
  }

  export class Locked extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'Locked';
    }
  }

  export class FailedDependency extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'FailedDependency';
    }
  }

  export class UpgradeRequired extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'UpgradeRequired';
    }
  }

  export class PreconditionRequired extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'PreconditionRequired';
    }
  }

  export class TooManyRequests extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'TooManyRequests';
    }
  }

  export class RequestHeaderFieldsTooLarge extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'RequestHeaderFieldsTooLarge';
    }
  }

  export class ConnectionClosedWithoutResponse extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'ConnectionClosedWithoutResponse';
    }
  }

  export class UnavailableForLegalReasons extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'UnavailableForLegalReasons';
    }
  }

  export class ClientClosedRequest extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'ClientClosedRequest';
    }
  }
}
