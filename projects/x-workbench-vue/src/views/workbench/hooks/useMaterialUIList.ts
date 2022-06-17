import { ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { apiGetMaterialUIList, TypeMaterialUICategory } from "@/api";

export default function useMaterialUIList(options?: { immediate: boolean }) {
  const list = ref<TypeMaterialUICategory[]>([]);
  const doFetch = async () => {
    const { data, msg } = await apiGetMaterialUIList();
    if (!data) {
      Message.error(msg);
      return;
    }
    list.value = data;
  };
  if (options?.immediate) {
    doFetch();
  }
  return { list, doFetch };
}
