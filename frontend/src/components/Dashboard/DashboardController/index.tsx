import React, { useEffect, useState } from 'react';
import './DashboardController.css';
import Pairs from '../DashboardPairsView';
import { ProcessedPair, RawPair } from './dbcTypes';

const DashboardController: React.FC = () => {
  const [instruments, setInstruments] = useState<ProcessedPair[]>([]);
  const [favPairs, setFavPairs] = useState<ProcessedPair[]>([]);

  const allPairsUrl = 'https://api.pro.coinbase.com/products';

  const productStatsUrl =
    'https://api.exchange.coinbase.com/products/BTC-USD/stats';

  useEffect(() => {

    let rawPairs: RawPair[] = [];

    const getAllPairs = async () => {
      await fetch(allPairsUrl)
        .then((res) => res.json())
        .then((data) => {rawPairs = data});

      let filteredPairs: ProcessedPair[] = rawPairs
        .filter((pair) => pair.quote_currency === 'USD')
        .map((pair) => {
          return {
            id: pair.id,
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
        .sort((a, b) => a.id > b.id ? 1 : -1
      );

      setInstruments(filteredPairs);
    };

    getAllPairs();
  }, []);

  const toggleFavoriteHandler =
    (e: React.MouseEvent<HTMLElement>, pairId: string) => {
      e.stopPropagation();
      const pairIdx = instruments.findIndex(
        (pair) => pair.id === pairId
      );
      const newFavorite = instruments[pairIdx];

      setInstruments(prevInstruments =>
        [...prevInstruments.filter(item => item.id !== pairId)]
      );

      setFavPairs(prevFavPairs =>
        [...prevFavPairs, newFavorite]
        .sort((a, b) => a.id > b.id ? 1 : -1)
      );
  };

  const selectPairHandler =
    (e: React.MouseEvent<HTMLElement>, pairId: string) => {
      e.stopPropagation();
      console.log(pairId);
  };

  return (
    <div className="DashboardController">
      <Pairs
        favData={favPairs}
        pairData={instruments}
        onSelectPair={selectPairHandler}
        onToggleFavorite={toggleFavoriteHandler}
      />
    </div>
  );
}

export default DashboardController;
