import React from 'react'

import { useState } from "react";
import { isAddress } from "ethers/lib/utils";
import { ethers } from "ethers";
import { myToken } from '../smartContract/myToken';

import { Layout } from '../components/layout'
import { Hero } from '../components/hero'
import { HeroIllustration } from '../components/hero-illustration'

export default function HomePage() {
  const [state, setState] = useState({providerData:undefined});
  const [ctState, ctSetState] = useState({});

  const connect = async () => {
    console.log('connection to metamask...');
      try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const signerAddress = await signer.getAddress();
          const network = await provider.getNetwork();
          const networkName = network.name;
          const chainId = network.chainId;
          console.log('connected : '+signerAddress);
          setState({providerData: {networkName, chainId, signerAddress}, provider, signer});
      } catch (error) {
        console.log(error);
        setState({error: "une erreur est survenue"});
      };
  };

  const fnList = async () => {
    console.log('ok')
    const contractAddress = "0xb82FF4fC0Cf0aab3C9c386342396C1f50AF8fd7b";
    if (isAddress(contractAddress)) {
        try {
            const ct = new ethers.Contract(contractAddress, myToken.abi, state.signer);
            const name = await ct.name();
            setState({name: name});
        } catch (error) {
            console.log(error);  
        };
    };
  };


  return (
    <Layout>
      <div className="section">
      <p>Test de front-end en React</p>
        <button className="m-2 inline-flex cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 py-4 px-7 text-center font-medium leading-4 text-white no-underline shadow-lg"
          onClick={connect}>Connecter Metamask
        </button>
        {state.providerData && <div>
          <p className='m-2 inline-flex cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 py-4 px-7 text-center font-medium leading-4 text-white no-underline shadow-lg'>
            {state.providerData.signerAddress}</p>
          <p>Liste des fonctions :</p>
          <button className="m-2 inline-flex cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 py-4 px-7 text-center font-medium leading-4 text-white no-underline shadow-lg"
            onClick={fnList}>See functions
          </button>
          {ctState &&
            <p>{ctState.name}</p>
          }
          </div>}
          
         
      </div>
      <div className="relative -ml-6 -mr-6 py-10 pl-40">
        {<HeroIllustration />}
      </div>
      {state.error && <div className="section">
        <div className="box">
          <p className="alertMsg">{state.error}</p>
        </div>
      </div>}
    </Layout>
  )
}
