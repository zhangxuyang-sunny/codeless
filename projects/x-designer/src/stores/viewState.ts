import { atom, useRecoilState } from "recoil";
import { IViewSchema } from "packages/x-core/dist/types/view";
import { NodeTypes } from "packages/x-core/dist/nodes";

export const viewState = atom<IViewSchema[] | null>({
  key: "view",
  default: [
    {
      id: "page_1",
      version: "1.0.0",
      title: "首页",
      description: "商城首页",
      material: {
        id: "container1",
        src: "http://localhost:7890/components/arco/Container.js",
        props: {
          type: NodeTypes.Object,
          properties: {}
        },
        style: {
          type: NodeTypes.Object,
          properties: {}
        },
        emits: [],
        listeners: [],
        slots: {
          default: [
            {
              id: "button",
              src: "http://localhost:7890/components/arco/Button.js",
              props: {
                type: NodeTypes.Object,
                properties: {}
              },
              style: {
                type: NodeTypes.Object,
                properties: {}
              },
              emits: [],
              listeners: [],
              slots: {}
            }
          ]
        }
      }
    }
  ]
});

export const useViewState = () => {
  const [data] = useRecoilState(viewState);

  return {
    viewState: data
  };
};
