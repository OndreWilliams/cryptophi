import React from 'react';
import './Pairs.css';
import { ProcessedPair } from '../DashboardController/dbcTypes';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface PairsProps {
  favData: ProcessedPair[];
  pairData: ProcessedPair[];
  onToggleFavorite: (e: React.MouseEvent<HTMLElement>, pairId: string) => void;
  onSelectPair: (e: React.MouseEvent<HTMLElement>, pairId: string) => void;
};


const Pairs: React.FC<PairsProps> = props => {

  return (
    <div className="Pairs">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Favorite</TableCell>
            <TableCell>Pair</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Tick Size</TableCell>
            <TableCell>Min Lot</TableCell>
            <TableCell align="right">Max Lot</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.favData.map((fav) => (
            <TableRow key={fav.id} onClick={(e) => {props.onSelectPair(e, fav.id)}}>
              <TableCell>
                <ToggleButton
                  value="check"
                  selected={fav.favorite}
                  onClick={(e) => {
                    props.onToggleFavorite(e, fav.id);
                  }}
                >
                  <CheckIcon/>
                </ToggleButton>
              </TableCell>
              <TableCell>{fav.display_name}</TableCell>
              <TableCell>{fav.status}</TableCell>
              <TableCell>{fav.base_increment}</TableCell>
              <TableCell>{fav.base_min_size}</TableCell>
              <TableCell align="right">{fav.base_max_size}</TableCell>
            </TableRow>
          ))}
          {props.pairData.map((pair) => (
            <TableRow key={pair.id} onClick={(e) => {props.onSelectPair(e, pair.id)}}>
              <TableCell>
                <ToggleButton
                  value=""
                  selected={pair.favorite}
                  onClick={(e) => {
                    props.onToggleFavorite(e, pair.id);
                  }}
                >
                  <CheckIcon sx={{ opacity: 0 }}/>
                </ToggleButton>
              </TableCell>
              <TableCell>{pair.display_name}</TableCell>
              <TableCell>{pair.status}</TableCell>
              <TableCell>{pair.base_increment}</TableCell>
              <TableCell>{pair.base_min_size}</TableCell>
              <TableCell align="right">{pair.base_max_size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Pairs;
