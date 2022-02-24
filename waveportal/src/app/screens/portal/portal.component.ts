import { Component, OnInit } from '@angular/core'
import { ethers } from 'ethers'
import { Wave } from 'src/app/interface/wave'
import abi from '../../utils/abi.json'
declare var window: any

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  account: any
  allWaves?: Wave[]
  contractAddres: string = '0x3264BE540a4c928c33FA2Ed54dca6617d08cb07F'
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
        this.getAllWaves()
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

        const waveTxn = await wavePortalContract.wave('Hello World')
        console.log('Mining transaction...', waveTxn.hash)

        await waveTxn.wait()
        console.log('Mined ', waveTxn.hash)

        count = await wavePortalContract.getTotalWaves()
        console.log(count.toNumber())

        const allWaves = await wavePortalContract.getAllWaves()
        console.log(allWaves)
      } else {
        console.log('Ethereum object does not exist')
      }
    } catch (error) {
      console.error
    }
  }

  async getAllWaves() {
    const { ethereum } = window
    if (!ethereum) {
      return
    }

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const wavePortalContract: any = new ethers.Contract(
      this.contractAddres,
      this.contractABI,
      signer
    )

    this.allWaves = await wavePortalContract.getAllWaves()
  }
}
