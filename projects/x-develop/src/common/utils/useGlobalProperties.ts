import { inject } from 'vue';
import type { TypeGlobalProperties } from '@/types';

export default function useGlobalProperties() {
  return inject<TypeGlobalProperties>('globalProperties');
}
