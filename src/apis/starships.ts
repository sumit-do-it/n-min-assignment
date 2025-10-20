import { StarshipsApiResponse } from "types/apis.type";
import { convertParamsToQueryString } from "utils/methods";

const endPoint = "https://swapi.dev/api/starships"; // should keep it in env file

export const getStarships = async (
  url = endPoint,
  params?: Record<string, string>
): Promise<StarshipsApiResponse | null> => {
  // If the url already contains query params, merge them with the params argument
  // considering the case that url contains query params, we need to merge them with the params argument
  let baseUrl = url;
  let urlParams: Record<string, string> = {};

  if (url.includes("?")) {
    const [mainUrl, qs] = url.split("?");
    baseUrl = mainUrl;
    qs.split("&").forEach((pair) => {
      if (pair) {
        const [key, value = ""] = pair.split("=");
        urlParams[key] = decodeURIComponent(value);
      }
    });
  }

  // Merge urlParams (from url) and params (argument), with params taking precedence
  const mergedParams = {
    ...urlParams,
    ...(params || {}),
  };

  const queryString =
    mergedParams && Object.keys(mergedParams).length > 0
      ? `?${convertParamsToQueryString(mergedParams)}`
      : "";
  try {
    console.log("@@@ fetch>>> ", baseUrl + queryString);
    const response = await fetch(baseUrl + queryString);

    const data = await response.json();
    // console.log("@@ data: ", data);
    return data;
  } catch (err) {
    console.log("@@ error: ", err);
    return null;
  }
};
