
export default function AccountCard (props){
    const {accountTitle , amount, amountDesc } = props

    
    function goToDetails(){
        console.log("go to details page")
    }

    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{accountTitle}</h3>
                <p className="account-amount">{amount}</p>
                <p className="account-amount-description">{amountDesc}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button" onClick={goToDetails}>View transactions</button>
            </div>
      </section>
    )
}