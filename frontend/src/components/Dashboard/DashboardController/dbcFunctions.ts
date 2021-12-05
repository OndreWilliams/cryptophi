import {
  ProcessedPair,
  RawPair,
  DataPoint,
  NumberArray,
  Note
} from './dbcTypes';

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

export const getPairDetails =
  async (pairId: string): Promise<DataPoint[]> => {

    const months: string[] = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const baseUrl = 'https://api.exchange.coinbase.com/products/';
    const options = {method: 'GET', headers: {Accept: 'application/json'}};

    const response =
    await fetch(`${baseUrl}${pairId}/candles?granularity=86400`, options);
    let data: DataPoint[] = [];
    if (response.ok){
      let result: NumberArray[] = await response.json();
      let j = 0;
      for(let i = result.length - 1; i >= 0; i--){
        let dateObj = new Date(result[i][0] * 1000);
        let month: string = months[dateObj.getMonth()];
        let day: number = dateObj.getDate();
        let year: string = dateObj.getFullYear().toString().slice(2);
        let dateString = `${month}-${day}-${year}`;
        data[j] = {
          date: dateString,
          close: result[i][4]
        }
        j++;
      }

      //   let dateObj = new Date(tlhocv[0]);
      //   let month: string = months[dateObj.getMonth()];
      //   let day: number = dateObj.getDate();
      //   let year: string = dateObj.getFullYear().toString().slice(2);
      //   let dateString = `${month}-${day}-${year}`;
      //   return {
      //     date: dateString,
      //     value: tlhocv[4]
      //   }
      // });
    }
    console.log(data);
    return data;

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

// Request server to add new Note to db >
export const addNote = async (userId: number, note: string): Promise<{content: string}[]> => {
  const response = await fetch('/api/notes', {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      userId,
      note
    })
  });
  let data: {content: string}[] = [];
  if (response.ok){
    let result = await response.json();
    data = result.notes;
  }
  return data;
};

// Request all current notes from server >
export const getNotes = async (userId: number): Promise<string[]> => {
  const response = await fetch(`/api/notes/${userId}`);
  let data: string[] = [];
  if (response.ok){

    let result = await response.json();

    for(let i = 0; i < result.length; i++){
      data.push(result[i].content);
    }
  }
  return data;
}
