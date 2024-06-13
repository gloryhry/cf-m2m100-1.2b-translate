function convertLanguageCodeToName(code) {
  switch (code.toLowerCase()) {
    case 'bg':
      return 'bulgarian';
    case 'BG':
      return 'bulgarian';
    case 'zh':
      return 'chinese';
    case 'ZH':
      return 'chinese';
    case 'cs':
      return 'czech';
    case 'CS':
      return 'czech';
    case 'da':
      return 'danish';
    case 'DA':
      return 'danish';
    case 'nl':
      return 'dutch';
    case 'NL':
      return 'dutch';
    case 'en':
      return 'english';
    case 'EN':
      return 'english';
    case 'et':
      return 'estonian';
    case 'ET':
      return 'estonian';
    case 'fi':
      return 'finnish';
    case 'FI':
      return 'finnish';
    case 'fr':
      return 'french';
    case 'FR':
      return 'french';
    case 'de':
      return 'german';
    case 'DE':
      return 'german';
    case 'el':
      return 'greek';
    case 'EL':
      return 'greek';
    case 'hu':
      return 'hungarian';
    case 'HU':
      return 'hungarian';
    case 'it':
      return 'italian';
    case 'IT':
      return 'italian';
    case 'ja':
      return 'japanese';
    case 'JA':
      return 'japanese';
    case 'lv':
      return 'latvian';
    case 'LV':
      return 'latvian';
    case 'lt':
      return 'lithuanian';
    case 'LT':
      return 'lithuanian';
    case 'pl':
      return 'polish';
    case 'PL':
      return 'polish';
    case 'pt':
      return 'portuguese';
    case 'PT':
      return 'portuguese';
    case 'ro':
      return 'romanian';
    case 'RO':
      return 'romanian';
    case 'ru':
      return 'russian';
    case 'RU':
      return 'russian';
    case 'sk':
      return 'slovak';
    case 'SK':
      return 'slovak';
    case 'sl':
      return 'slovenian';
    case 'SL':
      return 'slovenian';
    case 'es':
      return 'spanish';
    case 'ES':
      return 'spanish';
    case 'sv':
      return 'swedish';
    case 'SV':
      return 'swedish';
    default:
      return 'english';
  }
}

export default {
  async fetch(request, env) {
    try {
      // 检查请求方法和Content-Type
      if (request.method !== 'POST' || request.headers.get('Content-Type') !== 'application/json') {
        const return_text = 'DeepL Translate Api\nPOST {"text": "have a try", "source_lang": "auto", "target_lang": "ZH"} to /translate \nhttps://github.com/gloryhry/cf-m2m100-1.2b-translate.git';
        return new Response(return_text, { status: 200 });
      }

      // 检查请求地址
      if (request.url.endsWith('/translate')) {

        // 解析请求体
        const requestBody = await request.json();
        // console.log(requestBody);

        // 调用翻译函数
        const translationResult = await env.AI.run('@cf/meta/m2m100-1.2b', {
          text: requestBody.text,
          source_lang: convertLanguageCodeToName(requestBody.source_lang), // defaults to english
          target_lang: convertLanguageCodeToName(requestBody.target_lang)
        });
        // console.log(translationResult);
        // 构建回复
        const response = {
          alternatives: [translationResult.translated_text],
          code: 200,
          data: translationResult.translated_text,
          method: 'Free',
          source_lang: requestBody.source_lang,
          target_lang: requestBody.target_lang
        };

        // 返回翻译结果
        return new Response(JSON.stringify(response), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } else {
        return new Response('Not Found', { status: 404 });
      }
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
}
