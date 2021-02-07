#!/usr/bin/env node

import { get, request } from 'https'

const httpGetOptions = {
  hostname: 'firestore.googleapis.com',
  port: 443,
  path:
    '/v1/projects/grocery-inventory-1a394/databases/(default)/documents/items',
  method: 'GET'
}

const httpPostOptions = {
  hostname: 'api.telegram.org',
  port: 443,
  path: `/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

let telegramPayload = {
  chat_id: process.env.TELEGRAM_CHAT_ID,
  parse_mode: 'Markdown',
  text: "*Item's expiring within next 7 Days.* \n\n"
}

/**
 * Call Cloud Firestore's REST endpoint and get all the documents
 * No auth is done since the read rule is public
 * https://firebase.google.com/docs/firestore/use-rest-api
 *
 * @param httpGetOptions
 * @param callback
 */
const getFirestoreData = (httpGetOptions, callback) => {
  try {
    get(httpGetOptions, function(res) {
      res.setEncoding('utf8')

      let dataStr = ''
      res.on('data', chunk => {
        dataStr += chunk
      })
      res.on('end', () => {
        callback(JSON.parse(dataStr))
      })
      res.on('error', function(error) {
        throw error
      })
    })
  } catch (error) {
    console.error(error)
  }
}

/**
 * Process JSON data returned from the API
 *
 * @param results
 */
const processResults = results => {
  const expiredItems = []
  for (const [key, value] of Object.entries(results.documents)) {
    if (
      Object.prototype.hasOwnProperty.call(value, 'name') &&
      isDateWithinCriteria(value.fields.expiresOn.timestampValue)
    ) {
      expiredItems.push({
        name: value.fields.name.stringValue,
        expiresOn: new Date(
          value.fields.expiresOn.timestampValue
        ).toLocaleString('default', {
          month: 'long',
          day: 'numeric'
        })
      })
    }
  }

  postTelegrameBot(expiredItems)
}

/**
 * Call Telegram's REST endpoint with the payload to send to the group
 *
 */
const postTelegrameBot = expiredItems => {
  for (const [key, value] of Object.entries(expiredItems)) {
    telegramPayload.text += `- ${value.name} - ${value.expiresOn} \n`
  }

  try {
    const postRequest = request(httpPostOptions, res => {
      res.setEncoding('utf8')

      res.on('data', response => {
        console.log('POST Response: ' + response)
      })
    })

    postRequest.on('error', error => {
      throw error
    })

    postRequest.write(JSON.stringify(telegramPayload))
    postRequest.end()
  } catch (error) {
    console.error(error)
  }
}

/**
 * Item's expiration date needs to be within 7 days in the future for the criteria to match
 * If the given date is in the past of today, it'll be returned as false
 *
 * @param date
 * @returns {boolean|boolean}
 */
const isDateWithinCriteria = date => {
  const today = new Date()
  const futureDate = new Date(date)
  const difference = futureDate.getTime() - today.getTime()
  const sevenDays = 3600 * 24 * 7 * 1000

  return difference < sevenDays && difference > 0
}

/**
 * Entry point execution
 */
getFirestoreData(httpGetOptions, results => {
  processResults(results)
})
