#!/bin/bash

cd nft-series

near dev-deploy ./nft-series.wasm

CONTRACT_ADDRESS=`cat ./neardev/dev-account`

cd ../../frontend

touch .env.local

echo NEXT_PUBLIC_NFT_CONTRACT_NAME=$CONTRACT_ADDRESS >> .env.local