import { Box } from "@mui/material";
import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import { AddCreditsCard } from "../../../../../components/residents/credits/AddCreditsCard.tsx";
import { CreditsBalanceCard } from "../../../../../components/residents/credits/CreditsBalanceCard.tsx";
import { TransactionHistoryCard } from "../../../../../components/residents/credits/TransactionHistoryCard.tsx";
import {useCreditsData} from "@/pages/common/residents/pageHooks/useCreditsData.tsx";
import {useDispatch} from "react-redux";
import {setCredits, setTransactionHistory} from "@/context/residents/creditsSlice.ts";

export interface CreditsPageProps {
    credit_balance: number,
    transactions: object[]
}

export function CreditsPage() {
    const { loading, error, balanceCents, transactions} = useCreditsData();//apiHook
    const dispatch = useDispatch();//reduxHook

    //Since the database is not implemented, we still rely on using local state
    if(!loading && !error){
        if(balanceCents){
            dispatch(setCredits(balanceCents));
        }
        if(transactions){
            dispatch(setTransactionHistory(transactions));
        }
    }

    return (<>
        <CommonFrame commonFrameType={"RESIDENT"}/>
        <div className="credits-page">
            <h1>Credits</h1>
            {loading && <p>Loading credits data...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
                <>
                    <Box className="cards-row">
                        <Box className="card-container">
                            <h2>Credit Balance</h2>
                            <CreditsBalanceCard />
                        </Box>
                        <Box className="card-container">
                            <h2>Add funds</h2>
                            <AddCreditsCard />
                        </Box>
                    </Box>
                    <Box className="card-container">
                        <h2>Transaction History</h2>
                        <TransactionHistoryCard />
                    </Box>
                </>
            )}
        </div>
    </>)
}
//
// import { Box } from "@mui/material";
// import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
// import { AddCreditsCard } from "../../../../../components/residents/credits/AddCreditsCard.tsx";
// import { CreditsBalanceCard } from "../../../../../components/residents/credits/CreditsBalanceCard.tsx";
// import { TransactionHistoryCard } from "../../../../../components/residents/credits/TransactionHistoryCard.tsx";
//
// export interface CreditsPageProps {
//     credit_balance: number,
//     transactions: object[]
// }
//
// export function CreditsPage() {
//     return (<>
//         <CommonFrame commonFrameType={"RESIDENT"}>
//             <div className="credits-page">
//                 <h1>Credits</h1>
//                 <Box className="cards-row flex flex-col lg:items-center lg:flex-row gap-4 p-4">
//                     <Box className="card-container">
//                         <h2>Credit Balance</h2>
//                         <CreditsBalanceCard/>
//                     </Box>
//                     <Box className="card-container">
//                         <h2>Add funds</h2>
//                         <AddCreditsCard />
//                     </Box>
//                 </Box>
//                 <Box className="card-container">
//                     <h2>Transaction History</h2>
//                     <TransactionHistoryCard/>
//                 </Box>
//             </div>
//         </CommonFrame>
//     </>)
// }