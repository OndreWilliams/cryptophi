import { ProcessedPair, RawPair } from './dbcTypes';

// Request all pairs from the server >
export const getAllPairs =
  async (allPairsUrl: string): Promise<ProcessedPair[]> => {
  const response = await fetch(allPairsUrl);
  let data: RawPair[] = [];
  if (response.ok){
    data = await response.json();
  }

  let filteredPairs: ProcessedPair[] = data
    .filter((pair) => pair.quote_currency === 'USD')
    .map((pair) => {
      return {
        pairId: pair.id,
        base_currency: pair.base_currency,
        quote_currency: pair.quote_currency,
        base_min_size: pair.base_min_size,
        base_max_size: pair.base_max_size,
        base_increment: pair.base_increment,
        display_name: pair.display_name,
        margin_enabled: pair.margin_enabled,
        fx_stablecoin: pair.fx_stablecoin,
        trading_disabled: pair.trading_disabled,
        status: pair.status,
        favorite: false
      }
    })
    .sort((a, b) => a.pairId > b.pairId ? 1 : -1
  );
  return filteredPairs;
}

// Request server to add new favorite to db >
export const addFavorite = async (userId: number, pair: ProcessedPair): Promise<ProcessedPair[]> => {
  const response = await fetch('/api/favorites', {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      userId,
      pair
    })
  });
  let data: ProcessedPair[] = [];
  if (response.ok){
    let result = await response.json();
    data = result.favorites;
  }
  return data;
};

// Request server to remove a favorite from db >
export const removeFavorite = async (userId: number, pairId: string): Promise<ProcessedPair[]> => {
  const response = await fetch('/api/favorites', {
    headers: {'Content-Type': 'application/json'},
    method: 'DELETE',
    body: JSON.stringify({
      userId,
      pairId
    })
  });
  let data: ProcessedPair[] = [];
  if (response.ok){
    let result = await response.json();
    data = result.favorites;
  }
  return data;
};

// Request all current favorites from server >
export const getFavorites = async (userId: number): Promise<ProcessedPair[]> => {
  const response = await fetch(`/api/favorites/${userId}`);
  let data: ProcessedPair[] = [];
  if (response.ok){
    let result = await response.json();
    data = result.favorites;
  }
  return data;
}
