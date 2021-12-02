import { jsx as _jsx } from "react/jsx-runtime";
import './DashboardController.css';
import Pairs from '../DashboardPairsView';
const DashboardController = () => {
    const pairData = [{ instrument: 'BTC/USD' }];
    const toggleFavoriteHandler = (e) => {
        console.log(e.target);
    };
    const selectPairHandler = (e) => {
    };
    return (_jsx("div", Object.assign({ className: "DashboardController" }, { children: _jsx(Pairs, { pairData: pairData, onSelectPair: selectPairHandler, onToggleFavorite: toggleFavoriteHandler }, void 0) }), void 0));
};
export default DashboardController;
