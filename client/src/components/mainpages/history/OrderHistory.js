import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isSeller] = state.userAPI.isSeller
    const [token] = state.token

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                if(isSeller){
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    },[token, isSeller, setHistory])

  return (
    <div  className="history-page">
        <h2>History</h2>
        <h4>You have {history.length} ordered</h4>

        
            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                <td>{items.paymentID}</td>
                                <td>{items.createdAt}</td>
                                <td><Link to ={`/history/${items._id}`}>View</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    </div>
  )
}

export default OrderHistory