// Não é necessário carregar dotenv no frontend
// Não há acesso direto a variáveis de ambiente no navegador como no backend (Node.js).
// Você pode usar uma variável global ou um arquivo de configuração no frontend, mas aqui simularemos um valor fixo.

const CRYPTO_KEY = 'zzChvrLFgOLJSRRydMIWgxZwtHqJUhMj'; // Substitua por uma chave de 32 bytes (256 bits)
const CRYPTO_IV = 'tNGaEPGLDQhVpGUz'; // IV de 16 bytes

const DecryptId = async (id) => {
  if (window.crypto?.subtle) {
    try {
      const keyBuffer = new TextEncoder().encode(CRYPTO_KEY);
      const ivBuffer = new TextEncoder().encode(CRYPTO_IV);
      
      const key = await crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-CBC" },
        false,
        ["decrypt"]
      );
      
      const idBuffer = new Uint8Array(id.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
      
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv: ivBuffer },
        key,
        idBuffer
      );
      
      const decryptedText = new TextDecoder().decode(decryptedBuffer);
      return decryptedText;
    } catch (err) {
      console.error("Web Crypto API failed. Fallback to CryptoJS.");
    }
  }

  // Fallback para navegadores que não suportam a Web Crypto API
  try {
    const key = CryptoJS.enc.Utf8.parse(CRYPTO_KEY);
    const iv = CryptoJS.enc.Utf8.parse(CRYPTO_IV);
    const decrypted = CryptoJS.AES.decrypt(CryptoJS.enc.Hex.parse(id).toString(CryptoJS.enc.Base64), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error("Falha na descriptografia com CryptoJS:", err);
    throw new Error("Descriptografia falhou em todos os métodos.");
  }
};

export default DecryptId;
