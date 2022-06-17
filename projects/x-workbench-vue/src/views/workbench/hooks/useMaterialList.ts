import type { TypeMaterialSchema } from "packages/x-types/material";
import { ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { apiGetMaterials } from "@/api";

export default function useMaterialList() {
  const list = ref<TypeMaterialSchema[]>([]);
  const doFetch = async (ui: string, version: string) => {
    const { data, msg } = await apiGetMaterials(ui, version);
    if (!data) {
      Message.error(msg);
      return;
    }
    list.value = data;
  };
  return { list, doFetch };
}
