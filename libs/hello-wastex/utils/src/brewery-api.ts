const baseUrl = 'https://api.openbrewerydb.org/v1/breweries';

export type ApiBreweryType =
  | 'micro'
  | 'nano'
  | 'regional'
  | 'brewpub'
  | 'large'
  | 'planning'
  | 'bar'
  | 'contract'
  | 'proprietor'
  | 'closed';

/** A brewery item as returned by the open API */
export type ApiBrewery = {
  id: string;
  name: string;
  brewery_type: ApiBreweryType;
  address_1: string;
  address_2?: string;
  address_3?: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude?: string;
  latitude?: string;
  phone?: string;
  website_url: string;
  state: string;
  street: string;
};

type RandomParams = {
  size: number;
};

type ListParams = {
  /** Filter breweries by city. */
  city?: string;
  /** Sort the results by distance from an origin point, denoted by latitude,longitude */
  aroundPoint?: { lat: number; long: number };
  /** Filter breweries by name. */
  name?: string;
  /** The number of items returned for one fetch query */
  perPage: number;
  /** The page number you want to get */
  page: number;
  /** Filter by type of brewery. */
  type?: ApiBreweryType;
};

/** Generates an encoded get url string given the parameters you wanna see sent to the api */
export const breweryApi = {
  /**
   * Returns a set of random breweries
   * Only has a size parameter, no way to paginate this call. Use accordingly
   */
  randoms: ({ size }: RandomParams) => `${baseUrl}/random?size=${size}`,
  /**
   * Returns a set of paginated breweries given the filters you want
   */
  list: ({ city, aroundPoint, name, perPage, page, type }: ListParams) => {
    const tail = [];
    if (city) tail.push(`by_city=${encodeURI(city)}`);
    if (aroundPoint)
      tail.push(`by_dist=${aroundPoint.lat},${aroundPoint.long}`);
    if (name) tail.push(`by_name=${encodeURI(name)}`);
    if (type) tail.push(`by_type=${type}`);

    tail.push(`page=${page}&per_page=${perPage}`);
    return `${baseUrl}?${tail.join('&')}`;
  },
};
