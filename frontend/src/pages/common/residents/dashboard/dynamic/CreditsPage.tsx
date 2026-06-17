export interface CreditsPageProps{
    credit_balance : number,
    transactions: object
}



export function CreditsPage(){
    return (<>
    <div className="creditsPage">
        <h1>Credits</h1>
        <h1>Credit Balance</h1>
        <h1>Add funds</h1>
        <h1>Transaction History</h1>
    </div>
    </>)
}