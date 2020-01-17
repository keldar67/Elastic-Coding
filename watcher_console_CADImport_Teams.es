POST _watcher/watch/_execute
{
  "watch": {
    "trigger": {
      "schedule": {
        "interval": "5m"
      }
    },
    "input": {
      "search": {
        "request": {
          "indices": [
            "*log*"
          ],
          "body": {
            "query": {
              "bool": {
                "should": [
                  {
                    "match": {
                      "Command.keyword": "Transaction Successful"
                    }
                  }
                ],
                "must": [
                  {
                    "match": {
                      "Action.keyword": "Import Vector Data"
                    }
                  }
                ],
                "filter": [
                  {
                    "range": {
                      "@timestamp": {
                        "gte": "now-5m",
                        "lte": "now"
                      }
                    }
                  }
                ]
              }
            },
            "aggs": {
              "sessions": {
                "terms": {
                  "field": "log.file.path.keyword"
                }
              }
            }
          }
        }
      }
    },
    "transform": {},
    "actions": {}
  }
}