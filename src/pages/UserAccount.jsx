import AccountCard from "../components/AccountCard";

export default function UserAccount(){
    
    return (
    <main className="main bg-dark">
        <div className="header">
            <h1>Welcome back Benjamin !</h1>
            <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
            <AccountCard accountTitle="Argent Bank Chekking (x8349)" amount="$2,082.79" amountDesc="Available Balance"/>
            <AccountCard accountTitle="Argent Bank Saving (x6712)" amount="$10,928.42" amountDesc="Available Balance"/>
            <AccountCard accountTitle="Argent Bank Credit Card (x8349)" amount="$184.30" amountDesc="Available Balance"/>
    </main>

    )
}