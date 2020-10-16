# vision-api-function

Firebase FunctionsからCloud Vision APIを叩く。
トリガーはCloud Storageの特定のバケットにアップロードされた時。

- [Detect Logo](https://cloud.google.com/vision/docs/detecting-logos)
- [Detect Web entities and pages](https://cloud.google.com/vision/docs/detecting-web)

それぞれ、バケット名を環境変数で指定する必要がある。
バケットはそれぞれ`asia-northeast1`リージョンに作成する。

```shell
# 環境変数の追加
firebase functions:config:set bucket.logo="ロゴ用のバケット名"
firebase functions:config:set bucket.web="Web用のバケット名"

# (環境変数を削除したい場合)
firebase functions:config:unset bucket.logo
firebase functions:config:unset bucket.web

# deploy
npm run deploy
```
