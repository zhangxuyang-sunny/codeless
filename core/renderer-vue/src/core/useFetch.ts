/**
 * 基于 window.fetch 的请求
 * @docs: https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 */
export default function useFetch(options: RequestInit) {
  return {
    get(url: string, data: Record<string, string | number>) {
      const $url = new URL(url);
      for (const key in data) {
        $url.searchParams.append(key, String(data[key]));
      }
      return window.fetch($url.toString(), {
        ...options,
        method: "GET"
      });
    },
    post(url: string, params: Record<string, any>) {
      return window.fetch(url, {
        ...options,
        method: "POST",
        body: JSON.stringify(params)
      });
    },
    put() {},
    delete() {}
  };
}
