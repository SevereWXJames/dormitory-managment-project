// components/residents/credits/CreditsBalanceCard.tsx
// import { useSelector } from "react-redux";
// import { getUserId } from "@/context/authenticationSlice.ts";
import {useCreditsData} from "@/pages/common/residents/pageHooks/useCreditsData.tsx";

export function useCreditsBalanceCard() {
    const {loading, error, balanceCents} = useCreditsData();
    return {balance: balanceCents, error, loading}
}