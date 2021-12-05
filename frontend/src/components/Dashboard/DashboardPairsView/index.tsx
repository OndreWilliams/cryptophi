import React from 'react';
import './Pairs.css';
import { PairsProps } from '../DashboardController/dbcTypes';
import RowVariant from './rowVariant';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const Pairs: React.FC<PairsProps> = ({
    favData,
    nonfavData,
    onRemoveFav,
    onAddFav,
    onSelectPair
  }) => {

    return (
      <React.Fragment>
        <div className="tableHead">
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{width: 1/6, fontWeight: 600 }} align='center'>Favorite</TableCell>
                <TableCell sx={{width: 1/6, fontWeight: 600 }} align='center'>Pair</TableCell>
                <TableCell sx={{width: 1/6, fontWeight: 600 }} align='center'>Status</TableCell>
                <TableCell sx={{width: 1/6, fontWeight: 600 }} align='center'>Tick Size</TableCell>
                <TableCell sx={{width: 1/6, fontWeight: 600 }} align='center'>Min Lot</TableCell>
                <TableCell sx={{width: 1/6, fontWeight: 600 }} align='center'>Max Lot</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </div>

        <div className="tableRows">
          <Table size='small'>
            <TableBody >
              <RowVariant
                checkOpacity={100}
                pairs={favData}
                onToggleFav={onRemoveFav}
                onSelectPair={onSelectPair}
              />
              <RowVariant
                checkOpacity={0}
                pairs={nonfavData}
                onToggleFav={onAddFav}
                onSelectPair={onSelectPair}
              />
            </TableBody>
          </Table>
        </div>
      </React.Fragment>
    );
}

export default Pairs;
