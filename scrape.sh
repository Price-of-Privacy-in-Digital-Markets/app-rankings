#!/bin/bash

set -euo pipefail

countries=("us" "gb" "fr" "de" "it" "jp" "in" "br" "cn")
play_store_collections=("TOP_FREE" "TOP_PAID" "GROSSING")
app_store_collections=("TOP_FREE_IOS" "TOP_PAID_IOS" "TOP_GROSSING_IOS")

for country in ${countries[@]}; do
    mkdir -p play_store/$country
    for collection in ${play_store_collections[@]}; do
        echo "Scraping Play Store ${country} ${collection}"
        node scraper.js play_store --country ${country} $collection > play_store/${country}/${collection}_$(date -u '+%Y%m%d_%H%M%S').json
    done
done

for country in ${countries[@]}; do
    mkdir -p app_store/$country
    for collection in ${app_store_collections[@]}; do
        echo "Scraping App Store ${country} ${collection}"
        node scraper.js app_store --country ${country} ${collection} > app_store/${country}/${collection}_$(date -u '+%Y%m%d_%H%M%S').json
    done
done
