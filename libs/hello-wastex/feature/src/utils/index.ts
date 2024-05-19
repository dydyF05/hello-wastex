import { UIBreweryItem } from '@hello-wastex/ui';
import { ApiBrewery } from '@hello-wastex/utils';

/** Map a brewery item -as returned by the open api- to a displayable ui item */
export const mapApiBreweryToUI = (data: ApiBrewery): UIBreweryItem => ({
  address:
    (data.address_1 || data.street || '').trim() +
    (data.city || '').trim() +
    (data.state || data.state_province || '').trim() +
    (data.country || '').trim(),
  id: data.id,
  name: data.name,
  type: data.brewery_type,
  websiteUrl: data.website_url || undefined,
});
