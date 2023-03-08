from enum import Enum, unique


@unique
class Status(Enum):
    OK = "200"
    SERVER_ERROR = "500"
    NOT_FOUND = "404"
    BAD_REQUEST = "400"
    UNAUTHORIZED = "401"
    FORBIDDEN = "403"
    CONFLICT = "409"
    NO_CONTENT = "204"
