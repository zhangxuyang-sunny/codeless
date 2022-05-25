#!/bin/bash
pnpm --filter @low/server deploy

curl -X POST -H "Content-Type: application/json" \
	-d '{"msg_type":"text","content":{"text":"x-server 成功部署"}}' \
  https://open.feishu.cn/open-apis/bot/v2/hook/907d2be0-0929-4444-afbf-e1931257c5c8
