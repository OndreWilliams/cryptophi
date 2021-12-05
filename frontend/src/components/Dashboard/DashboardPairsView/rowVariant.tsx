import React from 'react';
import { RowVariantProps } from '../DashboardController/dbcTypes';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import './Pairs.css'

const RowVariant: React.FC<RowVariantProps> = props => {
  return(
    <React.Fragment>
      {props.pairs.map((pair) => (
        <TableRow
          key={pair.pairId}
          sx={{borderColor: '#2F455C'}}
          onClick={(e) => {props.onSelectPair(e, pair.pairId)}}
        >
          <TableCell sx={{width: 1/6, borderColor: '#2f455c7a'}} align='center'>
            <ToggleButton

              value={props.checkOpacity === 0 ? '' : 'check'}
              selected={props.checkOpacity === 0 ? false : true}
              onClick={(e) => {
                props.onToggleFav(e, pair);
              }}
            >
              <CheckIcon
                sx={{ opacity: props.checkOpacity }}
                fontSize='small'
                style={{color: '#2F455C'}}
              />
            </ToggleButton>
          </TableCell>
          <TableCell sx={{width: 1/6, borderColor: '#2f455c7a' }} align='center'>{pair.display_name}</TableCell>
          <TableCell sx={{width: 1/6, borderColor: '#2f455c7a' }} align='center'>{pair.status}</TableCell>
          <TableCell sx={{width: 1/6, borderColor: '#2f455c7a' }} align='center'>{`${pair.base_increment} ${pair.base_currency}`}</TableCell>
          <TableCell sx={{width: 1/6, borderColor: '#2f455c7a' }} align='center'>{`${pair.base_min_size} ${pair.base_currency}`}</TableCell>
          <TableCell sx={{width: 1/6, borderColor: '#2f455c7a' }} align='center'>{`${pair.base_max_size} ${pair.base_currency}`}</TableCell>
        </TableRow>
      ))}
    </React.Fragment>
  );
};

export default RowVariant;
