const keygen = require('ssh-keygen');
const fs = require('fs');

const generateKeys = async () => {
  return new Promise((fulfill, reject) => {
    // This is where we'll store the public and private keys
    const path = process.cwd() + '/.keys/';
    const location = path + 'digitalocean_rsa';
    const comment = 'brahim.akarouch@gmail.com';

    // Make sure the .keys folder exists
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    // Now generate the key
    keygen(
      {
        location: location,
        comment: comment,
        password: null, // No password as we're automating usage
        read: true
      },
      function(err, out) {
        if (err) {
          reject('Error creating SSH key: ' + err);
          return;
        }

        fulfill({
          privateKey: out.key,
          publicKey: out.pubKey
        });
      }
    );
  });
};

(async () => {
  try {
    const { privateKey, publicKey } = await generateKeys();

    console.log('Private Key:', privateKey);
    console.log('Public Key:', publicKey);
  } catch (ex) {
    console.error(ex);
  }
})();
