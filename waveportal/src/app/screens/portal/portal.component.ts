import { Component, OnInit } from '@angular/core'
import { ethers } from 'ethers'
import abi from '../../utils/abi.json'
declare var window: any

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  account: any
  contractAddres: string = '0x987C448728521F72f3A488DC00ed451EeD4D96c8'
  contractABI = abi

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

  async wave() {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract: any = new ethers.Contract(
          this.contractAddres,
          this.contractABI,
          signer
        )

        let count = await wavePortalContract.getTotalWaves()
        console.log(count.toNumber())

        const waveTxn = await wavePortalContract.wave()
        console.log('Mining transaction...', waveTxn.hash)

        await waveTxn.wait()
        console.log('Mined ', waveTxn.hash)

        count = await wavePortalContract.getTotalWaves()
        console.log(count.toNumber())
      } else {
        console.log('Ethereum object does not exist')
      }
    } catch (error) {
      console.error
    }
  }
}
