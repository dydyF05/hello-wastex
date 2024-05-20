/** What a brewery displayed item looks like */
export type UIBreweryItem = {
  id: string;
  name: string;
  type:
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
  address: string;
  websiteUrl?: string;
};
/** The props BreweryCardComponent handles */
export type UIBreweryComponentProps = {
  item?: UIBreweryItem;
  isLoading?: boolean;
};
