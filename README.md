# Cloudflare-Translation 

- 一个将Cloudflare的AI翻译模型转为DeepLx的API接口进行调用。

| Model ID | Descripiton |
| --- | --- |
| @cf/meta/m2m100-1.2b | Multilingual encoder-decoder (seq-to-seq) model trained for Many-to-Many multilingual translation <br> **languages**: english, chinese, french, spanish, arabic, russian, german, japanese, portuguese, hindi <br> [More information](https://github.com/facebookresearch/fairseq/tree/main/examples/m2m_100) <br> [Terms and license](https://github.com/facebookresearch/fairseq/blob/main/LICENSE)|

## 部署方式

- 创建cloudflare的Work
- 选择使用Workers AI Workers 模板
- 把[index.js](./index.js)的内容粘贴到cloudflare的work中
- 在cloudflare > work > 触发器,配置自定义域名
  
<img src=./screenshot-1705649100494.png width=60% />
  
## 测试

```bash
curl -X POST http://<workers_name>.<your_workers_domain>.workers.dev/translate \
-H "Content-Type: application/json" \
-d '{
    "text": "Hello, world!",
    "source_lang": "EN",
    "target_lang": "DE"
}'
```

### Request Parameters

 - text: string
 - source_lang: string
 - target_lang: string

### Response

```bash
{
    "alternatives": ["Hallo Welt!"],
    "code": 200,
    "data": "Hallo Welt!",
    "method": "Free",
    "source_lang": "EN",
    "target_lang": "DE"
}
```
