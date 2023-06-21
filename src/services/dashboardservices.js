import urls from "../helpers/url_helpers";
import { get } from "../helpers/api_helpers";
import store from "../store";

const config = {
  headers: { Authorization: `Bearer ${store.getters.token}` },
};
//Authentication

//Markets

export async function getMetrics() {
  return await get(`${urls.METRICS}`, config);
}
