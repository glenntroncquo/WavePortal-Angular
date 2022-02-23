import { Component, OnInit } from '@angular/core'
declare var window: any

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  account: any
  constructor() {}

  ngOnInit(): void {
    this.checkIfWalletIsConnected()
  }

  async checkIfWalletIsConnected() {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Make sure you have metamask!')
        return
      } else {
        console.log('We have the ethereum object', ethereum)
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account:', account)
        this.account = account
      } else {
        console.log('No authorized account found')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async connectWallet() {
    try {
      const { ethereum } = window

      if (!ethereum) {
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log(`Connected: ${accounts[0]}`)

      this.account = accounts[0]
    } catch (error) {}
  }
}
