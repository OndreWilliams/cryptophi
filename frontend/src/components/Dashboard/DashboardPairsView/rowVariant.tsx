import React from 'react';
import { RowVariantProps } from '../DashboardController/dbcTypes';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


const RowVariant: React.FC<RowVariantProps> = props => {
  return(
    <React.Fragment>
      {props.pairs.map((pair) => (
        <TableRow key={pair.pairId} onClick={(e) => {props.onSelectPair(e, pair.pairId)}}>
          <TableCell>
            <ToggleButton
              value={props.checkOpacity === 0 ? '' : 'check'}
              selected={props.checkOpacity === 0 ? false : true}
              onClick={(e) => {
                props.onToggleFav(e, pair);
              }}
            >
              <CheckIcon sx={{ opacity: props.checkOpacity }}/>
            </ToggleButton>
          </TableCell>
          <TableCell align='center'>{pair.display_name}</TableCell>
          <TableCell align='center'>{pair.status}</TableCell>
          <TableCell align='center'>{`${pair.base_increment} ${pair.base_currency}`}</TableCell>
          <TableCell align='center'>{`${pair.base_min_size} ${pair.base_currency}`}</TableCell>
          <TableCell align='right'>{`${pair.base_max_size} ${pair.base_currency}`}</TableCell>
        </TableRow>
      ))}
    </React.Fragment>
  );
};

export default RowVariant;
