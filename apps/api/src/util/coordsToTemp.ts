import axios from 'axios';

/**
 * Fetches current temp based upon a given longitude and latitude.
 *
 * Please see the docs for the API used
 * https://open-meteo.com/en/docs
 *
 * @param lat latitude
 * @param long longitude
 * @returns current temperature at location in Celsius
 */

const tempCache = new Map<string, number>();

// My thinking here is due to my Promise.all() running in parrallel on every request, if there are multiple requests for the same coords
// before the first one has resolved, it would make multiple API calls for the same coords. So I have a simple in-memory cache
// to store previously fetched temps for coords.
export const coordsToTemp = async (lat: number, long: number): Promise<number> => {
  const key = `${lat},${long}`;

  //Does the key already exist? if so just return the same data
  //This also avoids the error within the logs of "data: { error: true, reason: 'Too many concurrent requests' }"
  if (tempCache.has(key)) {
    //I know this non-null assertion is safe due to the has() check above, this is just to satisfy TS
    return tempCache.get(key)!;
  }

  const locationResult = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m&timezone=auto&forecast_days=1`
  );

  const temp = locationResult.data.current.temperature_2m as number;
  //I store the tempcache as a string and a number, string is to combine both lat and long into a unique key, number is the temp value
  tempCache.set(key, temp);
  return temp;
};
