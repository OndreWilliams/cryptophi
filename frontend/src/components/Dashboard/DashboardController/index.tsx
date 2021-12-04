import React, { useEffect, useState } from 'react';
import './DashboardController.css';
import Pairs from '../DashboardPairsView';
import { ProcessedPair } from './dbcTypes';
import { addFavorite, removeFavorite, getFavorites, getAllPairs } from './dbcFunctions';

const DashboardController: React.FC = () => {
  const [instruments, setInstruments] = useState<ProcessedPair[]>([]);
  const [favorites, setFavorites] = useState<ProcessedPair[]>([]);

  const allPairsUrl = 'https://api.pro.coinbase.com/products';

  const productStatsUrl =
    'https://api.exchange.coinbase.com/products/BTC-USD/stats';

  // Retrieve all pairs from Coinbase API on initial load >
  useEffect(() => {
    getAllPairs(allPairsUrl)
    .then((allPairs) => setInstruments(allPairs));

    getFavorites(1)
    .then((allFavorites) => setFavorites(allFavorites));
  }, []);

  // Click event handler for adding a new favorite >
  const addFavHandler =
    (e: React.MouseEvent<HTMLElement>, pair: ProcessedPair) => {
      e.stopPropagation();

      addFavorite(1, pair)
        .then((updatedFavorites) => {

          setFavorites(updatedFavorites
            .sort((a, b) => a.pairId > b.pairId ? 1 : -1));

          setInstruments((prevInstruments) =>
            [...prevInstruments.filter(item => item.pairId !== pair.pairId)]);
        });
  };

  // Click event handler for removing a favorite >
  const removeFavHandler =
    (e: React.MouseEvent<HTMLElement>, pair: ProcessedPair) => {
      e.stopPropagation();
      removeFavorite(1, pair.pairId)
        .then((updatedFavorites) => {

          setFavorites(updatedFavorites
            .sort((a, b) => a.pairId > b.pairId ? 1 : -1));

          setInstruments((prevInstruments) => [...prevInstruments, pair]
            .sort((a, b) => a.pairId > b.pairId ? 1 : -1));
        });

  };

  // Click event handler for setting current chart and info >
  const selectPairHandler =
    (e: React.MouseEvent<HTMLElement>, pairId: string) => {
      e.stopPropagation();
      console.log(pairId);
  };

  return (
    <div className='DashboardController'>
      <Pairs
        favData={favorites}
        nonfavData={instruments}
        onSelectPair={selectPairHandler}
        onAddFav={addFavHandler}
        onRemoveFav={removeFavHandler}
      />
    </div>
  );
}

export default DashboardController;
