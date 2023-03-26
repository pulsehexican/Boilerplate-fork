import { useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { Button, InputNumber, message } from "antd";
import { ethers } from "ethers";

import { useNativeBalance } from "../../../hooks/useNativeBalance";
import { parseBigNumberToFloat } from "../../../utils/formatters";
import AddressInput from "../../AddressInput";

const styles = {
  buttonTransfer: {
    display: "flex",
    margin: "15px 0"
  }
} as const;

const TransferEth: React.FC = () => {
  const { account, provider } = useWeb3React();
  const balance = useNativeBalance(provider, account);
  const [amount, setAmount] = useState<number | null>();
  const [receiver, setReceiver] = useState<string>();
  // Set up contract ABI and address
  const contractABI = '[{"constant":false,"inputs":[{"indexed":false,"internalType":"address","name":"hexAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"hexLaunch","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data","type":"uint256"},{"indexed":true,"internalType":"address","name":"claimant","type":"address"},{"indexed":true,"internalType":"uint40","name":"stakeId","type":"uint40"}],"name":"Claim","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data","type":"uint256"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"uint40","name":"stakeId","type":"uint40"}],"name":"LoanEnd","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data","type":"uint256"},{"indexed":true,"internalType":"address","name":"bidder","type":"address"},{"indexed":true,"internalType":"uint40","name":"stakeId","type":"uint40"},{"indexed":true,"internalType":"uint40","name":"liquidationId","type":"uint40"}],"name":"LoanLiquidateBid","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data","type":"uint256"},{"indexed":true,"internalType":"address","name":"liquidator","type":"address"},{"indexed":true,"internalType":"uint40","name":"stakeId","type":"uint40"},{"indexed":true,"internalType":"uint40","name":"liquidationId","type":"uint40"}],"name":"LoanLiquidateExit","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data","type":"uint256"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"uint40","name":"stakeId","type":"uint40"},{"indexed":true,"internalType":"uint40","name":"liquidationId","type":"uint40"}],"name":"LoanLiquidateStart","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data","type":"uint256"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"uint40","name":"stakeId","type":"uint40"}],"name":"LoanPayment","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data","type":"uint256"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"uint40","name":"stakeId","type":"uint40"}],"name":"LoanStart","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data","type":"uint256"},{"indexed":true,"internalType":"address","name":"minter","type":"address"},{"indexed":true,"internalType":"uint40","name":"stakeId","type":"uint40"}],"name":"Mint","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"dailyDataList","outputs":[{"internalType":"uint72","name":"dayMintedTotal","type":"uint72"},{"internalType":"uint72","name":"dayLoanedTotal","type":"uint72"},{"internalType":"uint72","name":"dayBurntTotal","type":"uint72"},{"internalType":"uint32","name":"dayInterestRate","type":"uint32"},{"internalType":"uint8","name":"dayMintMultiplier","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"hsim","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"liquidationList","outputs":[{"internalType":"uint256","name":"liquidationStart","type":"uint256"},{"internalType":"address","name":"hsiAddress","type":"address"},{"internalType":"uint96","name":"bidAmount","type":"uint96"},{"internalType":"address","name":"liquidator","type":"address"},{"internalType":"uint88","name":"endOffset","type":"uint88"},{"internalType":"bool","name":"isActive","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"loanedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"shareList","outputs":[{"components":[{"name":"stakeId","type":"uint40"},{"name":"stakeShares","type":"uint72"},{"name":"lockedDay","type":"uint16"},{"name":"stakedDays","type":"uint16"}],"internalType":"struct HEXStakeMinimal","name":"stake","type":"tuple"},{"internalType":"uint16","name":"mintedDays","type":"uint16"},{"internalType":"uint8","name":"launchBonus","type":"uint8"},{"internalType":"uint16","name":"loanStart","type":"uint16"},{"internalType":"uint16","name":"loanedDays","type":"uint16"},{"internalType":"uint32","name":"interestRate","type":"uint32"},{"internalType":"uint8","name":"paymentsMade","type":"uint8"},{"internalType":"bool","name":"isLoaned","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"currentDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"hsiIndex","type":"uint256"},{"indexed":false,"internalType":"address","name":"hsiAddress","type":"address"},{"indexed":false,"internalType":"address","name":"hsiStarterAddress","type":"address"}],"name":"claimInstanced","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"hsiIndex","type":"uint256"},{"indexed":false,"internalType":"address","name":"hsiAddress","type":"address"}],"name":"mintInstanced","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"stakeIndex","type":"uint256"},{"indexed":false,"internalType":"uint40","name":"stakeId","type":"uint40"}],"name":"claimNative","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"stakeIndex","type":"uint256"},{"indexed":false,"internalType":"uint40","name":"stakeId","type":"uint40"}],"name":"mintNative","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"hsiIndex","type":"uint256"},{"indexed":false,"internalType":"address","name":"hsiAddress","type":"address"}],"name":"calcLoanPayment","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"hsiIndex","type":"uint256"},{"indexed":false,"internalType":"address","name":"hsiAddress","type":"address"}],"name":"calcLoanPayoff","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"hsiIndex","type":"uint256"},{"indexed":false,"internalType":"address","name":"hsiAddress","type":"address"}],"name":"loanInstanced","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"hsiIndex","type":"uint256"},{"indexed":false,"internalType":"address","name":"hsiAddress","type":"address"}],"name":"loanPayment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"hsiIndex","type":"uint256"},{"indexed":false,"internalType":"address","name":"hsiAddress","type":"address"}],"name":"loanPayoff","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"hsiIndex","type":"uint256"},{"indexed":false,"internalType":"address","name":"hsiAddress","type":"address"}],"name":"loanLiquidate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"liquidationId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidationBid","type":"uint256"}],"name":"loanLiquidateBid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"hsiIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidationId","type":"uint256"}],"name":"loanLiquidateExit","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"proofOfBenevolence","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
  const contractAddress = '0x3819f64f282bf135d62168C1e513280dAF905e06';
  const Web3 = require('web3');
  const web3 = new Web3(provider);

  // Instantiate the contract
  const hedronContract = new web3.eth.Contract(contractABI, contractAddress);

  function handleSignMessage(event: { preventDefault: () => void }): void {
    event.preventDefault();

    if (!provider || !account) {
      window.alert("Wallet not connected");
      return;
    }

    async function transfer(amt: number): Promise<void> {
      const amtStrg = amt.toString();
      const tx = {
      from: web3.eth.accounts.givenProvider.selectedAddress,
      to: contractAddress,
      gasPrice: 1182500006,
      gasLimit: 70176,
      data: hedronContract.methods.loanLiquidateBid(3269, ethers.utils.parseEther(amtStrg)).encodeABI(),
    };

      if (provider) {
        try {
          const receipt = await provider.getSigner(account).sendTransaction(tx);
          message.info(`Success!\n\nTx Hash: ${receipt.hash}`);
        } catch (error) {
          if (typeof error === "string") {
            message.error("Error!" + `\n\n${error}`);
          } else if (error instanceof Error) {
            message.error("Error!" + `\n\n${error.message}`);
          }
        }
      }
    }

    if (amount) transfer(amount);
  }

  return (
    <div style={{ width: "40%", minWidth: "250px" }}>
      <AddressInput onChange={setReceiver} address={receiver} />
      <div style={{ display: "inline-flex", gap: "10px", width: "100%" }}>
        <InputNumber
          value={amount}
          onChange={setAmount}
          placeholder="Amount to transfer"
          min={0}
          max={balance ? parseBigNumberToFloat(balance) : 0}
          style={{ width: "100%", height: "80%", marginBlock: "auto" }}
        />

        <div style={styles.buttonTransfer}>
          <Button type="primary" shape="round" onClick={handleSignMessage}>
            Bid
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransferEth;
