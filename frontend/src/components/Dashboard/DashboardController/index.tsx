import React, { useEffect, useState } from 'react';
import './DashboardController.css';
import Pairs from '../DashboardPairsView';
import Chart from '../DashboardChartView';
import { ProcessedPair, DataPoint, NotesProps } from './dbcTypes';
import Notes from '../DashboardNotesView'
import Info from '../DashboardInfoView';

import {
  addFavorite,
  removeFavorite,
  getFavorites,
  getAllPairs,
  getPairDetails,
  addNote,
  getNotes
} from './dbcFunctions';

const DashboardController: React.FC = () => {
  const [instruments, setInstruments] = useState<ProcessedPair[]>([]);
  const [favorites, setFavorites] = useState<ProcessedPair[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [currNote, setCurrNote] = useState<string>('');

  const [currChartData, setCurrChartData] = useState<DataPoint[]>([]);

  const allPairsUrl = 'https://api.pro.coinbase.com/products';

  const productStatsUrl =
    'https://api.exchange.coinbase.com/products/BTC-USD/stats';

    const elem = document.getElementById('foo');


  // Retrieve all pairs from Coinbase API on initial load >
  useEffect(() => {
    getPairDetails('BTC-USD')
      .then((dataSet) => setCurrChartData(dataSet));

    getAllPairs(allPairsUrl)
      .then((allPairs) => setInstruments(allPairs));

    getFavorites(1)
      .then((allFavorites) => setFavorites(allFavorites));

    getNotes(1)
    .then((allNotes) => console.log("allNotes: ", allNotes));//setNotes(allNotes)

  }, []);

  // Click event handler for setting current chart and info >
  const selectPairHandler =
    (e: React.MouseEvent<HTMLElement>, pairId: string) => {
      e.stopPropagation();

      getPairDetails(pairId)
        .then((pairData: DataPoint[]) => setCurrChartData(pairData));
  };

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

  // Add a note to database >
  const addNoteHandler =
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const {currNote} = e.target as typeof e.target & {
        currNote: { value: string }
      };

      addNote(1, currNote.value)
        .then((updatedNotes) => {
          let data: string[] = [];
          for(let i = 0; i < updatedNotes.length; i++){
            data.push(updatedNotes[i].content);
          }
          setNotes(data);
        });
  };

  return (
    <div className='dashboardController'>
      <div className="dashboardGrid">
        <div className="chartAndInfo">
          <div className="chartContainer">
            <Chart
              chartData={currChartData}
            />
          </div>
          <div className="infoAndNotesContainer">
            <Notes
              notes={notes}
              currNote={currNote}
              addNoteHandler={addNoteHandler}
            />
          </div>
        </div>
        <div className="pairsContainer">
          <Pairs
            favData={favorites}
            nonfavData={instruments}
            onSelectPair={selectPairHandler}
            onAddFav={addFavHandler}
            onRemoveFav={removeFavHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardController;
