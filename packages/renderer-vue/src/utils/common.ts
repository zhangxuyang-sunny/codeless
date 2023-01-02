export const staticRoot = "//127.0.0.1:7890/static/";

export const remotePackages = {
  vue: () => System.import<typeof import("vue")>("vue"),
  vueRouter: () => System.import<typeof import("vue-router")>("vue-router"),
  pinia: () => System.import<typeof import("pinia")>("pinia")
};

export async function loadRemotePackages() {
  const [vue, vueRouter, pinia] = await Promise.all([
    remotePackages.vue(),
    remotePackages.vueRouter(),
    remotePackages.pinia()
  ]);
  return { vue, vueRouter, pinia };
}
