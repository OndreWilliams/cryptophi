
// Interface for pairs to be displayed in
  // dashboard table and saved in state >
export interface ProcessedPair {
  pairId: string;
  base_currency: string;
  quote_currency: string;
  base_min_size: string;
  base_max_size: string;
  base_increment: string;
  display_name: string;
  margin_enabled: boolean;
  fx_stablecoin: boolean;
  trading_disabled: boolean;
  status: string;
};

// Interface for handling of pairs received
  // directly from the Coinbase API >
export interface RawPair extends Omit<ProcessedPair, 'pairId'> {
  id: string;
  quote_increment: string;
  min_market_funds: string;
  max_market_funds: string;
  max_slippage_percentage: string;
  post_only: boolean;
  limit_only: boolean;
  cancel_only: boolean;
  status_message: string;
  auction_mode: boolean;
};

// Parent interface of RowVariantProps
  // and TableProps defined below >
interface PairProps {
  checkOpacity: number;
  onSelectPair: (e: React.MouseEvent<HTMLElement>, pairId: string) => void;
};

// Definition of function utilized in
  // RowVariantProps and TableProps defined below >
type ToggleFav = (e: React.MouseEvent<HTMLElement>, pair: ProcessedPair) => void;

// Final props interface for RowVariant component >
export interface RowVariantProps extends PairProps {
  pairs: ProcessedPair[];
  onToggleFav: ToggleFav;
};

// Final props interface for Pairs component >
export interface PairsProps extends Omit<PairProps, 'checkOpacity'> {
  favData: ProcessedPair[];
  nonfavData: ProcessedPair[];
  onAddFav: ToggleFav;
  onRemoveFav: ToggleFav;
};

// Type for chart data elements >
export interface DataPoint {date: string; close: number};

// Type for price data arrays that will be nested in an array on receipt >
export type NumberArray = number[];

export interface ChartProps {
  chartData: DataPoint[];
}
