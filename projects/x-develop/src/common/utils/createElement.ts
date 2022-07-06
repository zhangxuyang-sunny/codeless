import { v4 as uuid } from 'uuid';
import type { TypeMaterial, TypeMaterialEmit } from '@/types/schema/material';

class ConfigElement {
  private config: TypeMaterial = {
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
  constructor(src: TypeMaterial['src']) {
    this.setComponent(src);
  }
  setId(id: TypeMaterial['id']) {
    this.config.id = id;
    return this;
  }
  setName(name: TypeMaterial['name']) {
    this.config.name = name;
    return this;
  }
  setVersion(version: TypeMaterial['version']) {
    this.config.version = version;
    return this;
  }
  setComponent(src: TypeMaterial['src']) {
    this.config.src = src;
    return this;
  }
  setProps(props: TypeMaterial['props']) {
    this.config.props = {
      ...this.config.props,
      ...props
    };
    return this;
  }
  setCommonProps(props: TypeMaterial['commonProps']) {
    this.config.commonProps = {
      ...this.config.commonProps,
      ...props
    };
    return this;
  }
  setSlot(name: string, slots: TypeMaterial[]) {
    this.config.slots = {
      ...this.config.slots,
      [name]: slots
    };
  }
  setSlots(slots: TypeMaterial['slots']) {
    this.config.slots = {
      ...this.config.slots,
      ...slots
    };
    return this;
  }
  setStyle(style: TypeMaterial['style']) {
    this.config.style = {
      ...this.config.style,
      ...style
    };
    return this;
  }
  setEmits(emits: TypeMaterial['emits']) {
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

export default function createElement(src: TypeMaterial['src']) {
  return new ConfigElement(src);
}
