// Não é necessário carregar dotenv no frontend
// Não há acesso direto a variáveis de ambiente no navegador como no backend (Node.js).
// Você pode usar uma variável global ou um arquivo de configuração no frontend, mas aqui simularemos um valor fixo.

const CRYPTO_KEY = 'zzChvrLFgOLJSRRydMIWgxZwtHqJUhMj'; // Substitua por uma chave de 32 bytes (256 bits)
const CRYPTO_IV = 'tNGaEPGLDQhVpGUz'; // IV de 16 bytes

const DecryptId = async (id) => {
  try {
    // Converta a chave e o IV de string para ArrayBuffer
    const keyBuffer = new TextEncoder().encode(CRYPTO_KEY);
    const ivBuffer = new TextEncoder().encode(CRYPTO_IV);
    
    // Importa a chave para o formato adequado da Web Crypto API
    const key = await crypto.subtle.importKey(
      'raw', 
      keyBuffer, 
      { name: 'AES-CBC' }, 
      false, 
      ['decrypt']
    );
    
    // Converte o ID hexadecimal para ArrayBuffer
    const idBuffer = new Uint8Array(id.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // Descriptografa
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: ivBuffer },
      key,
      idBuffer
    );

    // Converte o ArrayBuffer de volta para texto
    const decryptedText = new TextDecoder().decode(decryptedBuffer);
    return decryptedText;
    
  } catch (error) {
    console.error('Error on DecryptId:', error);
    throw new Error('Error on DecryptId');
  }
};

export default DecryptId;
