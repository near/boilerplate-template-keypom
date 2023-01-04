#!/bin/bash

cd nft-series && near dev-deploy ./nft-series.wasm && cd ..

cd nft-simple && near dev-deploy ./nft-simple.wasm