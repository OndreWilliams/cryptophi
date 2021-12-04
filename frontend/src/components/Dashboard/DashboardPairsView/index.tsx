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
      <div className='Pairs'>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Favorite</TableCell>
              <TableCell align='center'>Pair</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Tick Size</TableCell>
              <TableCell align='center'>Min Lot</TableCell>
              <TableCell align='right'>Max Lot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
    );
}

export default Pairs;
