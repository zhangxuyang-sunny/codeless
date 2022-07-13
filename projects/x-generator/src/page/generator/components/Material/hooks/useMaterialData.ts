import { TypeMaterial } from "packages/x-types/material.d";
import { ref } from "vue";
import materialList from "../../../mock/materialList";
type TypeData = {
  type: TypeMaterial["type"];
};

export default (data: TypeData) => {
  const list = ref<TypeMaterial[]>([]);
  const loading = ref(false);
  const doFetch = async (): Promise<void> => {
    loading.value = true;
    const res = await materialList();
    list.value = res.filter(item => item.type === data.type);
    loading.value = false;
  };

  return {
    doFetch,
    list,
    loading
  };
};
