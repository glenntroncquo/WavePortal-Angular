const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners()
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')
    const waveContract = await waveContractFactory.deploy()
    await waveContract.deployed()

    console.log(`Contract has been deployed to: ${waveContract.address}`)
    console.log(`Contract was deployed by`, owner.address)

    let waveCount;
    waveCount = await waveContract.getTotalWaves()

    let waveTxn = await waveContract.wave('Hello World!')
    await waveTxn.wait()

    waveTxn = await waveContract.connect(randomPerson).wave('Hello World from random person')
    await waveTxn.wait()

    await waveContract.getTotalWaves()
    const waves = await waveContract.getAllWaves()
    console.log(waves)
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
runMain()