import { v4 as uuid } from 'uuid';
import type { TypeMaterialSchema, TypeMaterialEmit } from '@/types/schema/material';

class ConfigElement {
  private config: TypeMaterialSchema = {
    id: uuid(),
    name: '',
    version: '0.0.1',
    src: '',
    style: {},
    props: {},
    commonProps: {},
    slots: {},
    emits: [],
    listeners: []
  };
  constructor(src: TypeMaterialSchema['src']) {
    this.setComponent(src);
  }
  setId(id: TypeMaterialSchema['id']) {
    this.config.id = id;
    return this;
  }
  setName(name: TypeMaterialSchema['name']) {
    this.config.name = name;
    return this;
  }
  setVersion(version: TypeMaterialSchema['version']) {
    this.config.version = version;
    return this;
  }
  setComponent(src: TypeMaterialSchema['src']) {
    this.config.src = src;
    return this;
  }
  setProps(props: TypeMaterialSchema['props']) {
    this.config.props = {
      ...this.config.props,
      ...props
    };
    return this;
  }
  setCommonProps(props: TypeMaterialSchema['commonProps']) {
    this.config.commonProps = {
      ...this.config.commonProps,
      ...props
    };
    return this;
  }
  setSlot(name: string, slots: TypeMaterialSchema[]) {
    this.config.slots = {
      ...this.config.slots,
      [name]: slots
    };
  }
  setSlots(slots: TypeMaterialSchema['slots']) {
    this.config.slots = {
      ...this.config.slots,
      ...slots
    };
    return this;
  }
  setStyle(style: TypeMaterialSchema['style']) {
    this.config.style = {
      ...this.config.style,
      ...style
    };
    return this;
  }
  setEmits(emits: TypeMaterialSchema['emits']) {
    this.config.emits = [...this.config.emits, ...emits];
    return this;
  }
  setEmit(emit: TypeMaterialEmit) {
    this.config.emits = [...this.config.emits, emit];
    return this;
  }
  create() {
    return this.config;
  }
}

export default function createElement(src: TypeMaterialSchema['src']) {
  return new ConfigElement(src);
}
