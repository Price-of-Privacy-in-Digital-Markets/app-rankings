#!/bin/bash

set -euo pipefail

countries=("us" "gb" "fr" "de" "it" "jp" "in" "br" "cn")
play_store_collections=("TOP_FREE" "TOP_PAID" "GROSSING")
app_store_collections=("TOP_FREE_IOS" "TOP_PAID_IOS" "TOP_GROSSING_IOS")

mkdir -p {play_store,app_store}/rankings

for country in ${countries[@]}; do
    for collection in ${play_store_collections[@]}; do
        echo "Scraping Play Store ${country} ${collection}"
        node scraper.js play_store --country ${country} $collection > play_store/rankings/${country}_${collection}.json
    done
done

for country in ${countries[@]}; do
    for collection in ${app_store_collections[@]}; do
        echo "Scraping App Store ${country} ${collection}"
        node scraper.js app_store --country ${country} ${collection} > app_store/rankings/${country}_${collection}.json
    done
done
