"use strict";

class XENOSError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

class AuthenticationError extends XENOSError {
  constructor(message, details = {}) {
    super(message, 'AUTH_ERROR', details);
  }
}

class NetworkError extends XENOSError {
  constructor(message, details = {}) {
    super(message, 'NETWORK_ERROR', details);
  }
}

class RateLimitError extends XENOSError {
  constructor(message, details = {}) {
    super(message, 'RATE_LIMIT_ERROR', details);
  }
}

class ValidationError extends XENOSError {
  constructor(message, details = {}) {
    super(message, 'VALIDATION_ERROR', details);
  }
}

class MessageError extends XENOSError {
  constructor(message, details = {}) {
    super(message, 'MESSAGE_ERROR', details);
  }
}

class ConnectionError extends XENOSError {
  constructor(message, details = {}) {
    super(message, 'CONNECTION_ERROR', details);
  }
}

class TimeoutError extends XENOSError {
  constructor(message, details = {}) {
    super(message, 'TIMEOUT_ERROR', details);
  }
}

module.exports = {
  XENOSError,
  AuthenticationError,
  NetworkError,
  RateLimitError,
  ValidationError,
  MessageError,
  ConnectionError,
  TimeoutError
};
