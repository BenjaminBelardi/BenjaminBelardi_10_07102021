import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp , faChevronDown, faPen } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


export default function Dropdown (props){

    const {date, description, amount, balance, transactionDetails } = props
    const [detailsOpen, setOpenDetails] = useState(false)

    function dropDownClick(){
        setOpenDetails(!detailsOpen)
    }

    function edit(){
        console.log("editData")
    }

    return (
        <section className='dropdown-container'>
            <div className="dropdown__header">
                 <FontAwesomeIcon icon={detailsOpen ? faChevronUp : faChevronDown}  onClick={dropDownClick} />
                <span>{date}</span>
                <span>{description}</span>
                <span>{amount}</span>
                <span>{balance}</span>
            </div>
            {detailsOpen && 
            <ul className="dropdown__list">
                    <li key="Transaction">{`Transaction Type: ${transactionDetails.type}`}</li>
                    <li key="Category">{`Category: ${transactionDetails.category}`}  <FontAwesomeIcon icon={faPen} onClick={edit} /></li>
                    <li key="Notes">{`Notes: ${transactionDetails.note}`} <FontAwesomeIcon icon={faPen} onClick={edit} /> </li>
            </ul>}
        </section>
    )

}