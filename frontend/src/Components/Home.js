import React from 'react'

function Home() {
  const url = 'wss://stream.data.alpaca.markets/v1beta1/crypto'
  const socket = new WebSocket(url)
  const auth = {'action':'auth', 'key': 'AKPYK57XW6H0EI4TMXSV', 'secret': 'lT8uNfgKG6qj70ghEDpP2AWJcOATnN4xB4dBsomR'}

  const subscribe = {"action":"subscribe", "trades":["ETHUSD"], "quotes":["ETHUSD"], "bars":["ETHUSD"]}
  socket.onmessage = function(event) {
    let data = JSON.parse(event.data)
    console.log(data)
    const message = data[0]['msg'];
    if (message =='connected') {
      console.log('authentication')
      socket.send(JSON.stringify(auth))
    }
  //   if (message == 'authenticated') {
  //     socket.send(JSON.stringify(subscribe));
  // }
  }
  return (
    <div>
        <div className='body text-3xl bg-slate-50 text-center'>
            HI
        </div>
    </div>
  )
}

export default Home