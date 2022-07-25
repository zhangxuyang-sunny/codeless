import type { ObjectSchema } from "./Object";
import type { NumberSchema } from "./Number";
import type { StringSchema } from "./String";
import type { ArraySchema } from "./Array";
import type { FunctionSchema } from "./Function";
import type { PiniaSchema } from "./Pinia";
import type { SetSchema } from "./Set";
import type { BooleanSchema } from "./Boolean";
import type { RegExpSchema } from "./RegExp";
import type { SymbolSchema } from "./Symbol";
import type { BigIntSchema } from "./BigInt";
import type { MapSchema } from "./Map";
import type { RouterSchema } from "./Router";
import { PageSchema } from "./Page";

export type TypeSchemaCollection =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | RegExpSchema
  | SymbolSchema
  | BigIntSchema
  | ObjectSchema
  | ArraySchema
  | MapSchema
  | FunctionSchema
  | SetSchema
  | PageSchema
  | RouterSchema
  | PiniaSchema;
